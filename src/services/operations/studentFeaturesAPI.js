import { toast } from "react-hot-toast"

import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { resetCart } from "../../slices/cartSlice"
import { setPaymentLoading } from "../../slices/courseSlice"
import { apiConnector } from "../apiConnector"
import { studentEndpoints } from "../apis"

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints

// Load the Razorpay SDK from the CDN
function loadScript(src) { 
  return new Promise((resolve) => { // Return a promise which is resolved when the script is loaded
    const script = document.createElement("script")
    script.src = src
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

// Buy the Course
export async function BuyCourse(
  token,
  courses,
  user_details,
  navigate,
  dispatch
) {
  const toastId = toast.loading("Loading...")
  try {
    // Loading the script of Razorpay SDK
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

    if (!res) {
      toast.error(
        "Razorpay SDK failed to load. Check your Internet Connection."
      )
      return
    }

    // Initiating the Order in Backend
    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      {
        courses,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    )

    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message)
    }
    console.log("PAYMENT RESPONSE FROM BACKEND............", orderResponse.data)

    // Opening the Razorpay SDK
    const options = {
      key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      currency: orderResponse.data.data.currency, // Use any of the following ISO codes: https://razorpay.com/docs/payment-gateway/payments/international-payments/#supported-currencies
      amount: `${orderResponse.data.data.amount}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      order_id: orderResponse.data.data.id, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      name: "StudyNotion",
      description: "Thank you for Purchasing the Course.",
      image: rzpLogo,
      prefill: { // Pass customer details
        name: `${user_details.firstName} ${user_details.lastName}`,
        email: user_details.email,
      },
      handler: function (response) { // This function will be called after the payment is successful
        sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token)
        verifyPayment({ ...response, courses }, token, navigate, dispatch)
      },
    }
    const paymentObject = new window.Razorpay(options)

    paymentObject.open()
    paymentObject.on("payment.failed", function (response) {
      toast.error("Oops! Payment Failed.")
      console.log(response.error)
    })
  } catch (error) {
    console.log("PAYMENT API ERROR............", error)
    toast.error("Could Not make Payment.")
  }
  toast.dismiss(toastId)
}

// Verify the Payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying Payment...")
  dispatch(setPaymentLoading(true))
  try {
    // Verifying the Payment in Backend
    const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
      Authorization: `Bearer ${token}`, // Setting the Authorization header with the token
    })

    console.log("VERIFY PAYMENT RESPONSE FROM BACKEND............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }

    toast.success("Payment Successful. You are Added to the course ")
    navigate("/dashboard/enrolled-courses")
    dispatch(resetCart())
  } catch (error) {
    console.log("PAYMENT VERIFY ERROR............", error)
    toast.error("Could Not Verify Payment.")
  }
  toast.dismiss(toastId)
  dispatch(setPaymentLoading(false))
}

// Send the Payment Success Email
async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    )
  } catch (error) {
    console.log("PAYMENT SUCCESS EMAIL ERROR............", error)
  }
}

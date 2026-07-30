import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Card from '../common/Card'
import Button from '../common/Button'
import AuthHeader from './AuthHeader'
import InputField from './InputField'
import {
  validatePassword,
  validateRequired,
} from '../../utils/validation'

const API_URL = import.meta.env.VITE_API_URL;
const initialForm = {
  username: '',
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
}

export default function SignupCard() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const validate = () => {
    const nextErrors = {}

    if (!validateRequired(form.username)) {
      nextErrors.username = 'Username is required'
    }

    if (!validateRequired(form.firstName)) {
      nextErrors.firstName = 'First name is required'
    }

    if (!validateRequired(form.lastName)) {
      nextErrors.lastName = 'Last name is required'
    }

    if (!validateRequired(form.password)) {
      nextErrors.password = 'Password is required'
    } else if (!validatePassword(form.password)) {
      nextErrors.password = 'Password must be at least 8 characters'
    }

    if (!validateRequired(form.confirmPassword)) {
      nextErrors.confirmPassword = 'Please confirm your password'
    } else if (form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validate()) return

    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/public/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const responseText = await response.text()

      let responseMessage = responseText

      try {
        const parsedResponse = JSON.parse(responseText)

        if (typeof parsedResponse === 'string') {
          responseMessage = parsedResponse
        } else {
          responseMessage =
            parsedResponse.message || parsedResponse.detail || responseText
        }
      } catch {
        responseMessage = responseText
      }

      if (!response.ok) {
        throw new Error(responseMessage || 'Something went wrong')
      }

      toast.success(responseMessage)
      navigate('/login', {
        replace: true,
      })
    } catch (err) {
      const errorMessage =
        err instanceof TypeError && err.message.includes('Failed to fetch')
          ? 'Connection refused. Please try again after some time.'
          : err instanceof Error
          ? err.message
          : 'Something went wrong'
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card
      padding="md"
      className="animate-slide-up w-full max-w-115 rounded-[28px] border border-primary/20 bg-surface/90 px-6 py-6 shadow-2xl shadow-primary/10 backdrop-blur-xl sm:px-8 sm:py-7 transition-all hover:border-primary/30"
    >
      <AuthHeader
        title="Create Your Account"
        subtitle="Join DBMS Architect to design and manage database systems."
      />

      <form onSubmit={handleSubmit} className="mt-5 space-y-3.5" noValidate>
        <InputField
          label="Username"
          name="username"
          type="text"
          placeholder="Enter a unique username"
          value={form.username}
          onChange={handleChange('username')}
          error={errors.username}
          required
          autoComplete="username"
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <InputField
            label="First Name"
            name="firstName"
            type="text"
            placeholder="First name"
            value={form.firstName}
            onChange={handleChange('firstName')}
            error={errors.firstName}
            required
            autoComplete="given-name"
          />
          <InputField
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Last name"
            value={form.lastName}
            onChange={handleChange('lastName')}
            error={errors.lastName}
            required
            autoComplete="family-name"
          />
        </div>

        <InputField
          label="Password"
          name="password"
          type="password"
          placeholder="Create a strong password"
          value={form.password}
          onChange={handleChange('password')}
          error={errors.password}
          required
          autoComplete="new-password"
        />

        <InputField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          value={form.confirmPassword}
          onChange={handleChange('confirmPassword')}
          error={errors.confirmPassword}
          required
          autoComplete="new-password"
        />

        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={loading}
          disabled={loading}
          className="h-11 text-base font-bold shadow-lg shadow-primary/10 hover:shadow-xl hover:-translate-y-0.5 transition-all mt-1"
        >
          Sign Up
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-secondary">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-bold text-primary underline underline-offset-4 transition-colors duration-250 hover:text-amber-600"
        >
          Login
        </Link>
      </p>
    </Card>
  )
}

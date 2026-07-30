import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import Card from '../common/Card'
import Button from '../common/Button'
import AuthHeader from './AuthHeader'
import InputField from './InputField'
import Divider from './Divider'
import SocialButton from './SocialButton'
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

      navigate('/login', {
        replace: true,
        state: {
          toastMessage: responseMessage,
        },
      })
    } catch (err) {
      setErrors({
        submit: err instanceof Error ? err.message : 'Something went wrong',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card
      padding="md"
      className="animate-slide-up w-full max-w-107.5 px-6 py-8 sm:px-10 sm:py-10"
    >
      <AuthHeader
        title="Create Your Account"
        subtitle="Join DBMS Architect to design, document, and manage your data systems."
      />

      <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
        {errors.submit && (
          <div
            className="rounded-2xl border border-primary/10 bg-primary/5 px-4 py-3 text-sm text-primary"
            role="alert"
          >
            {errors.submit}
          </div>
        )}

        <InputField
          label="Username"
          name="username"
          type="text"
          placeholder="Enter your username, something unique"
          value={form.username}
          onChange={handleChange('username')}
          error={errors.username}
          required
          autoComplete="username"
        />
        <InputField
          label="FirstName"
          name="firstName"
          type="text"
          placeholder="Enter your first name"
          value={form.firstName}
          onChange={handleChange('firstName')}
          error={errors.firstName}
          required
          autoComplete="given-name"
        />
        <InputField
          label="LastName"
          name="lastName"
          type="text"
          placeholder="Enter your last name"
          value={form.lastName}
          onChange={handleChange('lastName')}
          error={errors.lastName}
          required
          autoComplete="family-name"
        />
        
        <InputField
          label="Password"
          name="password"
          type="password"
          placeholder="Create a password"
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
        >
          Sign Up
        </Button>
      </form>

      <div className="mt-6">
        <Divider text="OR SIGN UP WITH" />
      </div>

      <div className="mt-6 flex gap-4">
        <SocialButton
          label="Google"
          icon={<FcGoogle className="h-5 w-5" aria-hidden="true" />}
        />
        <SocialButton
          label="GitHub"
          icon={<FaGithub className="h-5 w-5 text-primary" aria-hidden="true" />}
        />
      </div>

      <p className="mt-8 text-center text-base text-secondary">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-semibold text-primary transition-colors duration-250 hover:text-primary/80"
        >
          Login
        </Link>
      </p>
    </Card>
  )
}

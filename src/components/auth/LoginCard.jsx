import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import Card from '../common/Card'
import Button from '../common/Button'
import AuthHeader from './AuthHeader'
import InputField from './InputField'
import Divider from './Divider'
import SocialButton from './SocialButton'
import ForgotPasswordLink from './ForgotPasswordLink'
import {
  validatePassword,
  validateRequired,
} from '../../utils/validation'

const initialForm = { username: '', password: '' }

export default function LoginCard() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const validate = () => {
    const nextErrors = {}

    if (!validateRequired(form.username)) {
      nextErrors.username = 'Username is required'
    }

    if (!validateRequired(form.password)) {
      nextErrors.password = 'Password is required'
    } else if (!validatePassword(form.password)) {
      nextErrors.password = 'Password must be at least 8 characters'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event) => {
  event.preventDefault();

  if (!validate()) return;

  setLoading(true);

  try {
    const response = await fetch("http://localhost:8080/public/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    console.log("Success:", data);

    // Navigate to login page or dashboard
    // navigate("/login");

  } catch (err) {
    console.error(err);
    // Show error toast/message
  } finally {
    setLoading(false);
  }
};

  return (
    <Card
      padding="md"
      className="animate-slide-up w-full max-w-[460px] px-6 py-8 sm:px-10 sm:py-10"
    >
      <AuthHeader
        title="Welcome Back"
        subtitle="Sign in to continue building and managing your database architecture."
      />

      <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
        <InputField
          label="Username"
          name="username"
          type="text"
          placeholder="Enter your username"
          value={form.username}
          onChange={handleChange('username')}
          error={errors.username}
          required
          autoComplete="username"
        />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-[15px] font-medium text-primary">
              Password
            </label>
            <ForgotPasswordLink />
          </div>

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange('password')}
            required
            autoComplete="current-password"
            aria-invalid={errors.password ? 'true' : undefined}
            aria-describedby={errors.password ? 'password-error' : undefined}
            className="h-[52px] w-full rounded-2xl border border-primary/10 bg-background px-4 text-base text-primary placeholder:text-secondary/70 transition-all duration-250 focus:border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/15"
          />

          {errors.password && (
            <p id="password-error" className="text-sm text-primary/80" role="alert">
              {errors.password}
            </p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={loading}
          disabled={loading}
        >
          Login
        </Button>
      </form>

      <div className="mt-6">
        <Divider />
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
        Don&apos;t have an account?{' '}
        <Link
          to="/signup"
          className="font-semibold text-primary transition-colors duration-250 hover:text-primary/80"
        >
          Sign Up
        </Link>
      </p>
    </Card>
  )
}

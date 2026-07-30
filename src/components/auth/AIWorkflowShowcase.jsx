import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiOutlineChatBubbleLeftEllipsis,
  HiOutlineCpuChip,
  HiOutlineCodeBracket,
  HiOutlineCheckCircle,
  HiOutlineSparkles,
} from 'react-icons/hi2'
import LogoIcon from './LogoIcon'

const PRESETS = [
  {
    prompt: 'Create a Railway Reservation Database with trains, stations, bookings, and passengers',
    sqlLines: [
      'CREATE TABLE trains (',
      '  train_id SERIAL PRIMARY KEY,',
      '  train_name VARCHAR(100) NOT NULL,',
      '  source VARCHAR(50),',
      '  destination VARCHAR(50)',
      ');',
      '',
      'CREATE TABLE bookings (',
      '  booking_id UUID PRIMARY KEY,',
      '  user_id INT REFERENCES users(id),',
      '  train_id INT REFERENCES trains(train_id),',
      '  status VARCHAR(20) DEFAULT \'CONFIRMED\'',
      ');',
      '',
      'ALTER TABLE bookings ADD CONSTRAINT fk_train',
      '  FOREIGN KEY (train_id) REFERENCES trains(train_id);',
    ],
    tablesCount: '12 Tables',
    relCount: '16 Relationships',
  },
  {
    prompt: 'Design an E-Commerce Database with users, products, orders, and payment tracking',
    sqlLines: [
      'CREATE TABLE products (',
      '  product_id SERIAL PRIMARY KEY,',
      '  name VARCHAR(150) NOT NULL,',
      '  price DECIMAL(10, 2) NOT NULL,',
      '  stock INT DEFAULT 0',
      ');',
      '',
      'CREATE TABLE orders (',
      '  order_id UUID PRIMARY KEY,',
      '  user_id UUID REFERENCES users(id),',
      '  total_amount DECIMAL(10, 2),',
      '  status VARCHAR(20) DEFAULT \'PAID\'',
      ');',
      '',
      'ALTER TABLE orders ADD CONSTRAINT fk_user',
      '  FOREIGN KEY (user_id) REFERENCES users(id);',
    ],
    tablesCount: '14 Tables',
    relCount: '18 Relationships',
  },
]

const AI_STATUS_STAGES = [
  'Analyzing Prompt...',
  'Extracting Entities...',
  'Building Relationships...',
  'Normalizing to 3NF...',
  'Generating SQL...',
]

export default function AIWorkflowShowcase() {
  const [presetIndex, setPresetIndex] = useState(0)
  // Step 0: Prompt Typing
  // Step 1: Particle 1->2
  // Step 2: AI Processing
  // Step 3: Particle 2->3
  // Step 4: SQL Typing
  // Step 5: Success State
  const [activeStep, setActiveStep] = useState(0)

  // Typing state for Step 0
  const [typedPrompt, setTypedPrompt] = useState('')
  const [promptCharIndex, setPromptCharIndex] = useState(0)

  // AI stage index for Step 2
  const [aiStageIndex, setAiStageIndex] = useState(0)

  // Typing state for Step 4
  const [typedCode, setTypedCode] = useState('')
  const [codeCharIndex, setCodeCharIndex] = useState(0)

  const currentPreset = PRESETS[presetIndex]
  const fullSqlText = currentPreset.sqlLines.join('\n')

  // Timeline Controller
  useEffect(() => {
    let timer

    if (activeStep === 0) {
      // Step 0: Type out prompt
      if (promptCharIndex < currentPreset.prompt.length) {
        timer = setTimeout(() => {
          setTypedPrompt(currentPreset.prompt.slice(0, promptCharIndex + 1))
          setPromptCharIndex((prev) => prev + 1)
        }, 30)
      } else {
        // Finished typing prompt, pause briefly then move particle 1->2
        timer = setTimeout(() => {
          setActiveStep(1)
        }, 600)
      }
    } else if (activeStep === 1) {
      // Step 1: Particle travelling to AI card (lasts 700ms)
      timer = setTimeout(() => {
        setAiStageIndex(0)
        setActiveStep(2)
      }, 700)
    } else if (activeStep === 2) {
      // Step 2: AI Processing stages cycling
      if (aiStageIndex < AI_STATUS_STAGES.length - 1) {
        timer = setTimeout(() => {
          setAiStageIndex((prev) => prev + 1)
        }, 400)
      } else {
        // AI processing done, particle moves 2->3
        timer = setTimeout(() => {
          setActiveStep(3)
        }, 500)
      }
    } else if (activeStep === 3) {
      // Step 3: Particle travelling to SQL card (lasts 700ms)
      timer = setTimeout(() => {
        setTypedCode('')
        setCodeCharIndex(0)
        setActiveStep(4)
      }, 700)
    } else if (activeStep === 4) {
      // Step 4: Typing SQL code
      if (codeCharIndex < fullSqlText.length) {
        timer = setTimeout(() => {
          setTypedCode(fullSqlText.slice(0, codeCharIndex + 4))
          setCodeCharIndex((prev) => prev + 4)
        }, 15)
      } else {
        // Finished SQL typing -> transition to Success
        timer = setTimeout(() => {
          setActiveStep(5)
        }, 400)
      }
    } else if (activeStep === 5) {
      // Step 5: Success state hold 2.5s then restart
      timer = setTimeout(() => {
        setPresetIndex((prev) => (prev + 1) % PRESETS.length)
        setTypedPrompt('')
        setPromptCharIndex(0)
        setTypedCode('')
        setCodeCharIndex(0)
        setAiStageIndex(0)
        setActiveStep(0)
      }, 2500)
    }

    return () => clearTimeout(timer)
  }, [activeStep, promptCharIndex, aiStageIndex, codeCharIndex, currentPreset, fullSqlText])

  return (
    <aside
      className="relative hidden flex-col justify-between overflow-hidden rounded-[32px] border border-primary/20 bg-primary p-6 shadow-2xl lg:flex lg:w-[54%] group"
      aria-label="Interactive AI Workflow Showcase"
    >
      {/* Background Orbs & Pattern */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-500/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Brand Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-background shadow-md shadow-black/20 shrink-0">
            <LogoIcon size="lg" className="text-amber-500" />
          </div>
          <div>
            <p className="text-xl font-extrabold text-background tracking-tight">DBMS Architect</p>
            <p className="text-[11px] font-medium text-amber-200/90 font-mono">Live Workflow Showcase</p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-2.5 py-0.5 text-[10px] font-mono text-emerald-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          Live AI Engine
        </div>
      </div>

      {/* Main Workflow Section */}
      <div className="relative z-10 my-4 flex-1 flex flex-col justify-center space-y-4">
        
        {/* Horizontal Card Connector SVG with Particle */}
        <div className="relative w-full">
          {/* 3 Step Cards Header Track */}
          <div className="grid grid-cols-3 gap-3 relative z-10">
            
            {/* CARD 1: USER PROMPT */}
            <motion.div
              animate={{
                scale: activeStep === 0 ? 1.03 : 0.98,
                opacity: activeStep === 0 ? 1 : 0.65,
              }}
              transition={{ duration: 0.3 }}
              className={`rounded-2xl border p-4 backdrop-blur-xl transition-colors ${
                activeStep === 0
                  ? 'border-amber-400/60 bg-background/20 shadow-lg shadow-amber-500/10'
                  : 'border-white/10 bg-background/10'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-lg bg-amber-400/20 text-amber-300">
                  <HiOutlineChatBubbleLeftEllipsis className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-background font-mono uppercase tracking-wider">
                  1. User Prompt
                </span>
              </div>
              <p className="text-[11px] text-amber-100/70 line-clamp-1">Natural language input</p>
            </motion.div>

            {/* CARD 2: AI ENGINE */}
            <motion.div
              animate={{
                scale: activeStep === 2 ? 1.03 : 0.98,
                opacity: activeStep === 2 ? 1 : 0.65,
              }}
              transition={{ duration: 0.3 }}
              className={`rounded-2xl border p-4 backdrop-blur-xl transition-colors ${
                activeStep === 2
                  ? 'border-amber-400/60 bg-background/20 shadow-lg shadow-amber-500/20'
                  : 'border-white/10 bg-background/10'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-lg bg-amber-400/20 text-amber-300">
                  <HiOutlineCpuChip
                    className={`h-4 w-4 ${activeStep === 2 ? 'animate-spin' : ''}`}
                  />
                </div>
                <span className="text-xs font-bold text-background font-mono uppercase tracking-wider">
                  2. AI Engine
                </span>
              </div>
              <p className="text-[11px] text-amber-100/70 line-clamp-1">3NF Normalization</p>
            </motion.div>

            {/* CARD 3: SQL SCHEMA */}
            <motion.div
              animate={{
                scale: activeStep >= 4 ? 1.03 : 0.98,
                opacity: activeStep >= 4 ? 1 : 0.65,
              }}
              transition={{ duration: 0.3 }}
              className={`rounded-2xl border p-4 backdrop-blur-xl transition-colors ${
                activeStep >= 4
                  ? 'border-emerald-400/60 bg-background/20 shadow-lg shadow-emerald-500/20'
                  : 'border-white/10 bg-background/10'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-lg bg-emerald-400/20 text-emerald-300">
                  <HiOutlineCodeBracket className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-background font-mono uppercase tracking-wider">
                  3. SQL Output
                </span>
              </div>
              <p className="text-[11px] text-emerald-100/70 line-clamp-1">DDL & Constraints</p>
            </motion.div>
          </div>

          {/* Dotted Flow Connector Bar with Travelling Particle */}
          <div className="relative mt-3 h-2 w-full px-8">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
              <line
                x1="0%"
                y1="50%"
                x2="100%"
                y2="50%"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeDasharray="4 4"
                strokeWidth="2"
              />
            </svg>

            {/* Golden Particle Dot */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.9)] z-20 flex items-center justify-center"
              animate={{
                left:
                  activeStep === 0
                    ? '16%'
                    : activeStep === 1
                    ? '50%'
                    : activeStep === 2
                    ? '50%'
                    : activeStep === 3
                    ? '84%'
                    : '84%',
              }}
              transition={{ duration: activeStep === 1 || activeStep === 3 ? 0.7 : 0.3, ease: 'easeInOut' }}
            >
              <div className="w-2 h-2 rounded-full bg-white animate-ping opacity-75" />
            </motion.div>
          </div>
        </div>

        {/* Dynamic Display Area */}
        <div className="relative rounded-2xl border border-white/15 bg-black/50 p-4 shadow-2xl backdrop-blur-2xl min-h-[170px] flex flex-col justify-center">
          
          {/* VIEW FOR STEP 0 & 1: USER PROMPT TYPING */}
          {(activeStep === 0 || activeStep === 1) && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between text-[11px] text-amber-300/80 font-mono">
                <span>USER INPUT PROMPT</span>
                <span>STEP 1/3</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 font-mono text-xs sm:text-sm text-amber-200 leading-relaxed min-h-[70px]">
                "{typedPrompt}"
                <span className="inline-block w-2 h-4 bg-amber-400 ml-1 animate-pulse" />
              </div>
            </motion.div>
          )}

          {/* VIEW FOR STEP 2: AI ENGINE PROCESSING */}
          {(activeStep === 2 || activeStep === 3) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-2 text-center space-y-3"
            >
              <div className="relative flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-2 border-amber-400/40 border-t-amber-400 animate-spin" />
                <HiOutlineSparkles className="h-5 w-5 text-amber-400 absolute" />
              </div>

              <div>
                <p className="text-[11px] font-mono text-amber-200/70 uppercase tracking-widest">
                  AI Architecture Processing
                </p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={aiStageIndex}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="text-base font-bold text-amber-300 font-mono mt-0.5"
                  >
                    {AI_STATUS_STAGES[aiStageIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Mini progress ticks */}
              <div className="flex gap-1.5">
                {AI_STATUS_STAGES.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx <= aiStageIndex ? 'w-5 bg-amber-400' : 'w-1.5 bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* VIEW FOR STEP 4: SQL TYPING */}
          {activeStep === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="font-mono text-xs sm:text-sm text-emerald-300/90 space-y-2"
            >
              <div className="flex items-center justify-between text-[11px] text-emerald-400/70 border-b border-white/10 pb-2">
                <span>GENERATING DDL SCRIPT...</span>
                <span>POSTGRESQL</span>
              </div>
              <pre className="p-3 rounded-xl bg-black/60 border border-white/5 max-h-[140px] overflow-y-auto leading-relaxed whitespace-pre-wrap">
                {typedCode}
                <span className="inline-block w-2 h-4 bg-emerald-400 ml-1 animate-pulse" />
              </pre>
            </motion.div>
          )}

          {/* VIEW FOR STEP 5: SUCCESS STATE */}
          {activeStep === 5 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="py-3 px-2 text-center space-y-4"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-400/40 px-4 py-1.5 text-sm font-bold text-emerald-300">
                <HiOutlineCheckCircle className="h-5 w-5 text-emerald-400" />
                <span>Schema Generated Successfully</span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                  <p className="text-xs text-amber-200/70 font-mono">TABLES</p>
                  <p className="text-sm font-bold text-background font-mono mt-0.5">
                    {currentPreset.tablesCount}
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                  <p className="text-xs text-amber-200/70 font-mono">RELATIONS</p>
                  <p className="text-sm font-bold text-background font-mono mt-0.5">
                    {currentPreset.relCount}
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                  <p className="text-xs text-amber-200/70 font-mono">STATUS</p>
                  <p className="text-sm font-bold text-emerald-400 font-mono mt-0.5">
                    Production Ready
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer Note */}
      <div className="relative z-10 text-center text-xs text-amber-100/60 font-mono">
        Seamlessly converts user ideas into production-ready schemas.
      </div>
    </aside>
  )
}

import { useState } from 'react'
import {
  HiOutlineCodeBracket,
  HiOutlineDocumentDuplicate,
  HiOutlineCheck,
  HiOutlineSparkles,
  HiOutlineKey,
  HiOutlineLink,
  HiOutlineArrowRight,
  HiOutlineCircleStack,
  HiOutlineCpuChip
} from 'react-icons/hi2'
import { RiDatabase2Line, RiBracesLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const SAMPLE_PRESETS = [
  {
    id: 'ecommerce',
    label: '🛒 E-commerce & Billing',
    prompt: 'Build a multi-vendor e-commerce platform schema with user accounts, products, categories, orders, order line items, and stripe payments with full 3NF normalization.',
    tablesCount: 6,
    fkCount: 9,
    sql: {
      postgresql: `-- =============================================
-- DBMS ARCHITECT AI GENERATED SCHEMA (PostgreSQL)
-- Prompt: Multi-vendor E-commerce Platform
-- Normalization: 3NF | Dialect: PostgreSQL 16+
-- =============================================

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'customer' CHECK (role IN ('customer', 'vendor', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(120) NOT NULL UNIQUE,
    parent_id INT REFERENCES categories(id) ON DELETE SET NULL
);

CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category_id INT NOT NULL REFERENCES categories(id),
    title VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    stock_quantity INT DEFAULT 0 CHECK (stock_quantity >= 0),
    status VARCHAR(20) DEFAULT 'active'
);

CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    total_amount NUMERIC(12, 2) NOT NULL,
    status VARCHAR(30) DEFAULT 'pending',
    placed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    unit_price NUMERIC(10, 2) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    CONSTRAINT fk_order_product UNIQUE (order_id, product_id)
);

CREATE INDEX idx_products_vendor ON products(vendor_id);
CREATE INDEX idx_orders_customer ON orders(customer_id);`,

      mysql: `-- =============================================
-- DBMS ARCHITECT AI GENERATED SCHEMA (MySQL 8.0)
-- Prompt: Multi-vendor E-commerce Platform
-- =============================================

CREATE TABLE users (
    id CHAR(36) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    role ENUM('customer', 'vendor', 'admin') DEFAULT 'customer',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(120) NOT NULL UNIQUE,
    parent_id INT NULL,
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE products (
    id CHAR(36) PRIMARY KEY,
    vendor_id CHAR(36) NOT NULL,
    category_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT DEFAULT 0,
    FOREIGN KEY (vendor_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id)
) ENGINE=InnoDB;

CREATE TABLE orders (
    id CHAR(36) PRIMARY KEY,
    customer_id CHAR(36) NOT NULL,
    total_amount DECIMAL(12, 2) NOT NULL,
    status VARCHAR(30) DEFAULT 'pending',
    placed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES users(id)
) ENGINE=InnoDB;`,

      supabase: `-- =============================================
-- DBMS ARCHITECT AI GENERATED SCHEMA (Supabase RLS Ready)
-- =============================================

CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    role TEXT DEFAULT 'customer',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id UUID NOT NULL REFERENCES public.profiles(id),
    title TEXT NOT NULL,
    price NUMERIC NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE POLICY "Public products viewable" ON public.products FOR SELECT USING (true);`
    },
    tables: [
      {
        name: 'users',
        columns: [
          { name: 'id', type: 'UUID', isPk: true },
          { name: 'email', type: 'VARCHAR(255)', isUnique: true },
          { name: 'full_name', type: 'VARCHAR(100)' },
          { name: 'role', type: 'VARCHAR(20)' },
          { name: 'created_at', type: 'TIMESTAMPTZ' }
        ]
      },
      {
        name: 'products',
        columns: [
          { name: 'id', type: 'UUID', isPk: true },
          { name: 'vendor_id', type: 'UUID', isFk: true, ref: 'users.id' },
          { name: 'category_id', type: 'INT', isFk: true, ref: 'categories.id' },
          { name: 'title', type: 'VARCHAR(255)' },
          { name: 'price', type: 'NUMERIC(10,2)' }
        ]
      },
      {
        name: 'orders',
        columns: [
          { name: 'id', type: 'UUID', isPk: true },
          { name: 'customer_id', type: 'UUID', isFk: true, ref: 'users.id' },
          { name: 'total_amount', type: 'NUMERIC(12,2)' },
          { name: 'status', type: 'VARCHAR(30)' }
        ]
      },
      {
        name: 'order_items',
        columns: [
          { name: 'id', type: 'BIGINT', isPk: true },
          { name: 'order_id', type: 'UUID', isFk: true, ref: 'orders.id' },
          { name: 'product_id', type: 'UUID', isFk: true, ref: 'products.id' },
          { name: 'quantity', type: 'INT' }
        ]
      }
    ]
  },
  {
    id: 'saas',
    label: '⚡ SaaS Auth & Workspaces',
    prompt: 'Design a multi-tenant SaaS schema supporting organizations, team memberships, RBAC roles, subscription plans, and audit logs.',
    tablesCount: 5,
    fkCount: 8,
    sql: {
      postgresql: `-- =============================================
-- DBMS ARCHITECT AI GENERATED SCHEMA (SaaS Multi-Tenant)
-- =============================================

CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    plan_tier VARCHAR(30) DEFAULT 'free',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    role VARCHAR(30) DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
    invited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE audit_logs (
    id BIGSERIAL PRIMARY KEY,
    org_id UUID NOT NULL REFERENCES organizations(id),
    actor_id UUID NOT NULL,
    action VARCHAR(100) NOT NULL,
    ip_address INET,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`,

      mysql: `-- =============================================
-- DBMS ARCHITECT AI GENERATED SCHEMA (MySQL SaaS)
-- =============================================

CREATE TABLE organizations (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    plan_tier VARCHAR(30) DEFAULT 'free'
) ENGINE=InnoDB;

CREATE TABLE members (
    id CHAR(36) PRIMARY KEY,
    org_id CHAR(36) NOT NULL,
    role VARCHAR(30) DEFAULT 'member',
    FOREIGN KEY (org_id) REFERENCES organizations(id) ON DELETE CASCADE
) ENGINE=InnoDB;`,

      supabase: `-- Supabase Multi-tenant Organizations Schema
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    owner_id UUID REFERENCES auth.users(id)
);`
    },
    tables: [
      {
        name: 'organizations',
        columns: [
          { name: 'id', type: 'UUID', isPk: true },
          { name: 'name', type: 'VARCHAR(100)' },
          { name: 'slug', type: 'VARCHAR(100)', isUnique: true },
          { name: 'plan_tier', type: 'VARCHAR(30)' }
        ]
      },
      {
        name: 'members',
        columns: [
          { name: 'id', type: 'UUID', isPk: true },
          { name: 'org_id', type: 'UUID', isFk: true, ref: 'organizations.id' },
          { name: 'role', type: 'VARCHAR(30)' }
        ]
      },
      {
        name: 'audit_logs',
        columns: [
          { name: 'id', type: 'BIGINT', isPk: true },
          { name: 'org_id', type: 'UUID', isFk: true, ref: 'organizations.id' },
          { name: 'action', type: 'VARCHAR(100)' },
          { name: 'timestamp', type: 'TIMESTAMPTZ' }
        ]
      }
    ]
  }
]

export default function HeroStudioPreview() {
  const [activePreset, setActivePreset] = useState(SAMPLE_PRESETS[0])
  const [activeTab, setActiveTab] = useState('sql') // 'sql' or 'diagram'
  const [activeDialect, setActiveDialect] = useState('postgresql')
  const [copied, setCopied] = useState(false)
  const [activeTable, setActiveTable] = useState(null)

  const currentSql = activePreset.sql[activeDialect] || activePreset.sql.postgresql

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSql)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 rounded-[28px] border border-primary/15 bg-[#141824] p-3 sm:p-5 shadow-2xl shadow-primary/20 text-slate-100 overflow-hidden relative group">
      {/* Background Subtle Gradient Lights */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80 px-2">
        {/* Left Window Dots + Title */}
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <div className="h-4 w-[1px] bg-slate-800 hidden sm:block" />
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <RiDatabase2Line className="text-amber-400 h-4 w-4" />
            <span>schema_studio_v2.sql</span>
            <span className="bg-emerald-500/15 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/20 font-sans font-medium">
              3NF Validated
            </span>
          </div>
        </div>

        {/* View Switcher Tabs (SQL / Diagram) */}
        <div className="flex items-center gap-2 bg-slate-900/90 p-1 rounded-xl border border-slate-800 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('sql')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'sql'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <HiOutlineCodeBracket className="h-4 w-4" />
            SQL Code Editor
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('diagram')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'diagram'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <RiBracesLine className="h-4 w-4" />
            Interactive ER Diagram
          </button>
        </div>
      </div>

      {/* Preset Prompts Pill Bar */}
      <div className="flex items-center gap-2 py-3 overflow-x-auto custom-scrollbar px-2 border-b border-slate-800/60">
        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 shrink-0 flex items-center gap-1">
          <HiOutlineSparkles className="text-amber-400 h-3.5 w-3.5" /> Prompt Presets:
        </span>
        {SAMPLE_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => setActivePreset(preset)}
            className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 transition-all ${
              activePreset.id === preset.id
                ? 'bg-slate-800 text-amber-300 border border-amber-500/30'
                : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Active Prompt Description Box */}
      <div className="bg-slate-900/60 px-4 py-2.5 my-3 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs text-slate-300 gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <HiOutlineCpuChip className="h-4 w-4 text-amber-400 shrink-0" />
          <p className="truncate font-mono text-[12px] text-slate-300">
            <span className="text-slate-500">AI Prompt &gt; </span>"{activePreset.prompt}"
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-3 shrink-0 text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1">
            <HiOutlineCircleStack className="text-amber-400 h-3.5 w-3.5" /> {activePreset.tablesCount} Tables
          </span>
          <span className="flex items-center gap-1">
            <HiOutlineLink className="text-amber-400 h-3.5 w-3.5" /> {activePreset.fkCount} Foreign Keys
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === 'sql' ? (
        <div className="relative">
          {/* Dialect Selector & Copy Button Toolbar */}
          <div className="flex items-center justify-between bg-[#191e2e] px-4 py-2 rounded-t-xl border border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-mono text-[11px]">Dialect:</span>
              {['postgresql', 'mysql', 'supabase'].map((dialect) => (
                <button
                  key={dialect}
                  type="button"
                  onClick={() => setActiveDialect(dialect)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono capitalize transition-all ${
                    activeDialect === dialect
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {dialect}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors border border-slate-700"
              >
                {copied ? (
                  <>
                    <HiOutlineCheck className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <HiOutlineDocumentDuplicate className="h-3.5 w-3.5 text-slate-400" />
                    <span>Copy SQL</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Code Viewer Box */}
          <div className="bg-[#0f121c] p-4 rounded-b-xl border border-t-0 border-slate-800 font-mono text-[13px] leading-relaxed text-slate-300 overflow-x-auto max-h-[340px] custom-scrollbar">
            <pre className="whitespace-pre">
              {currentSql.split('\n').map((line, idx) => {
                let isComment = line.trim().startsWith('--')
                let isKeyword = line.includes('CREATE TABLE') || line.includes('PRIMARY KEY') || line.includes('FOREIGN KEY') || line.includes('REFERENCES')

                return (
                  <div key={idx} className="table-row group/line hover:bg-slate-900/60 transition-colors">
                    <span className="table-cell pr-4 text-right text-slate-600 select-none text-[11px] w-8">
                      {idx + 1}
                    </span>
                    <span className={`table-cell ${
                      isComment
                        ? 'text-slate-500 italic'
                        : isKeyword
                        ? 'text-amber-200'
                        : 'text-slate-200'
                    }`}>
                      {line}
                    </span>
                  </div>
                )
              })}
            </pre>
          </div>
        </div>
      ) : (
        /* ER Diagram Interactive Visualizer */
        <div className="bg-[#0f121c] p-4 rounded-xl border border-slate-800 min-h-[300px] max-h-[380px] overflow-auto custom-scrollbar relative">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs text-slate-400 font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Auto-Generated Entity-Relationship Graph (Click a table to inspect keys)
            </p>
            <span className="text-[11px] text-slate-500 font-mono">
              Cardinality: 1:N (One-to-Many)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {activePreset.tables.map((table) => {
              const isSelected = activeTable === table.name
              return (
                <div
                  key={table.name}
                  onClick={() => setActiveTable(isSelected ? null : table.name)}
                  className={`rounded-xl border p-3 cursor-pointer transition-all duration-250 ${
                    isSelected
                      ? 'bg-slate-800/90 border-amber-400 shadow-lg shadow-amber-400/10 scale-[1.02]'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                  }`}
                >
                  {/* Table Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                    <span className="font-mono font-bold text-xs text-amber-300 flex items-center gap-1.5">
                      <RiDatabase2Line className="text-amber-400 h-3.5 w-3.5" />
                      {table.name}
                    </span>
                    <span className="text-[10px] font-mono bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
                      {table.columns.length} cols
                    </span>
                  </div>

                  {/* Table Columns */}
                  <div className="space-y-1.5 text-[11px] font-mono">
                    {table.columns.map((col) => (
                      <div
                        key={col.name}
                        className="flex items-center justify-between text-slate-300 group/col hover:text-white"
                      >
                        <div className="flex items-center gap-1.5 min-w-0">
                          {col.isPk && (
                            <HiOutlineKey className="h-3 w-3 text-amber-400 shrink-0" title="Primary Key" />
                          )}
                          {col.isFk && (
                            <HiOutlineLink className="h-3 w-3 text-sky-400 shrink-0" title={`Foreign Key -> ${col.ref}`} />
                          )}
                          {!col.isPk && !col.isFk && (
                            <span className="w-3 h-3 block" />
                          )}
                          <span className={`truncate ${col.isPk ? 'font-semibold text-amber-200' : ''}`}>
                            {col.name}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500 group-hover/col:text-slate-400 ml-1">
                          {col.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Bottom CTA Strip */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 px-2">
        <p className="text-xs text-slate-400 text-center sm:text-left">
          ⚡ Ready to build your customized database schema?
        </p>
        <Link
          to="/dashboard"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-amber-500/20 hover:scale-[1.02]"
        >
          <span>Open AI Schema Studio</span>
          <HiOutlineArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  )
}

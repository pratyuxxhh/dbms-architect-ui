import { useState } from 'react'
import Container from '../common/Container'
import {
  HiOutlineCpuChip,
  HiOutlineShare,
  HiOutlineArrowsRightLeft,
  HiOutlineShieldCheck,
  HiOutlineCheckCircle
} from 'react-icons/hi2'
import { RiDatabase2Line } from 'react-icons/ri'

const FEATURE_TABS = [
  {
    id: 'ai-engine',
    title: 'AI Normalization Engine',
    shortDesc: 'Automated 3NF & BCNF schema synthesis from plain text',
    icon: HiOutlineCpuChip,
    badge: 'Core Engine',
    bullets: [
      'Extracts entities, attributes, and relationships seamlessly.',
      'Enforces Third Normal Form (3NF) to eliminate redundant data.',
      'Generates correct PostgreSQL, MySQL, and SQLite data types.',
      'Applies strict NOT NULL, UNIQUE, and CHECK constraints.'
    ],
    mockup: {
      type: 'code',
      title: 'PostgreSQL Output Example',
      lines: [
        'CREATE TABLE inventory_items (',
        '    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),',
        '    warehouse_id INT REFERENCES warehouses(id),',
        '    sku VARCHAR(64) UNIQUE NOT NULL,',
        '    stock_count INT CHECK (stock_count >= 0),',
        '    last_restocked TIMESTAMPTZ DEFAULT NOW()',
        ');',
        'CREATE INDEX idx_inv_warehouse ON inventory_items(warehouse_id);'
      ]
    }
  },
  {
    id: 'er-diagrams',
    title: 'Entity Relationship (ER) Graphs',
    shortDesc: 'Visual card representation of tables & foreign keys',
    icon: HiOutlineShare,
    badge: 'Visualizer',
    bullets: [
      'Interactive visual layout of primary and foreign keys.',
      'Shows cardinalities (1:1, 1:N, N:M junction tables).',
      'Helps developers and teams audit schema structure before deploying.',
      'Instant diagram rendering for fast mental mapping.'
    ],
    mockup: {
      type: 'diagram',
      nodes: [
        { name: 'users', pk: 'id (UUID)', fk: [] },
        { name: 'orders', pk: 'id (UUID)', fk: ['user_id -> users.id'] },
        { name: 'payments', pk: 'id (UUID)', fk: ['order_id -> orders.id'] }
      ]
    }
  },
  {
    id: 'multi-dialect',
    title: 'Multi-Dialect Translation',
    shortDesc: 'Seamless export across PostgreSQL, MySQL, and SQLite',
    icon: HiOutlineArrowsRightLeft,
    badge: 'Multi-Engine',
    bullets: [
      'One-click dialect conversion with dialect-specific DDL syntax.',
      'Translates PostgreSQL `UUID` / `TIMESTAMPTZ` to MySQL `CHAR(36)` / `DATETIME`.',
      'Formats Supabase Row-Level Security (RLS) policies.',
      'Generates clean SQL files ready for migrations.'
    ],
    mockup: {
      type: 'comparison',
      pg: 'created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
      mysql: 'created_at DATETIME DEFAULT CURRENT_TIMESTAMP',
      sqlite: 'created_at TEXT DEFAULT CURRENT_TIMESTAMP'
    }
  },
  {
    id: 'anti-pattern',
    title: 'Anti-Pattern & Index Auditor',
    shortDesc: 'Best-practice validation & indexing recommendation',
    icon: HiOutlineShieldCheck,
    badge: 'Audit Guard',
    bullets: [
      'Detects unindexed foreign keys to prevent full table scans.',
      'Recommends index placements for high-cardinality lookups.',
      'Validates naming conventions (snake_case, singular/plural rules).',
      'Enforces ANSI SQL standards for max cross-database compatibility.'
    ],
    mockup: {
      type: 'audit',
      score: '98/100',
      checks: [
        { name: 'Unindexed Foreign Keys', status: 'Passed (Indexes added)' },
        { name: '3NF Normalization', status: 'Passed (No duplicate groups)' },
        { name: 'Primary Key Coverage', status: 'Passed (UUID / BigInt PKs)' }
      ]
    }
  }
]

export default function InteractiveFeatures() {
  const [activeTabId, setActiveTabId] = useState(FEATURE_TABS[0].id)
  const activeTab = FEATURE_TABS.find((t) => t.id === activeTabId) || FEATURE_TABS[0]

  return (
    <section id="features" className="py-12 sm:py-20 lg:py-24 bg-surface/40 border-y border-primary/10 relative">
      <Container>
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-secondary font-bold bg-primary/10 px-3 py-1 rounded-full">
            Powerful Platform Capabilities
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-primary mt-3 sm:mt-4 tracking-tight">
            Engineered for Modern DB Architects
          </h2>
          <p className="text-sm sm:text-lg text-primary/80 mt-3 sm:mt-4 leading-relaxed">
            Everything you need to design, validate, and export production database schemas without manual DDL headaches.
          </p>
        </div>

        {/* Tab Buttons Bar */}
        <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto custom-scrollbar pb-4 mb-6 sm:mb-10 px-1">
          {FEATURE_TABS.map((tab) => {
            const Icon = tab.icon
            const isActive = tab.id === activeTabId
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTabId(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold shrink-0 transition-all ${
                  isActive
                    ? 'bg-primary text-background shadow-lg shadow-primary/20 scale-[1.02]'
                    : 'bg-background/80 text-primary hover:bg-background border border-primary/10'
                }`}
              >
                <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${isActive ? 'text-amber-300' : 'text-primary'}`} />
                <span>{tab.title}</span>
              </button>
            )
          })}
        </div>

        {/* Tab Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center bg-background rounded-3xl border border-primary/15 p-5 sm:p-10 shadow-xl">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold">
              <span>{activeTab.badge}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-primary">
              {activeTab.title}
            </h3>

            <p className="text-base text-primary/85 leading-relaxed">
              {activeTab.shortDesc}
            </p>

            <div className="space-y-3 pt-2">
              {activeTab.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <HiOutlineCheckCircle className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-primary/90">
                    {bullet}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Interactive Mockup Container */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-slate-800 bg-[#141824] p-5 text-slate-100 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-xs text-slate-400">
                    feature_preview.sql
                  </span>
                </div>
                <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                  Live Feature Preview
                </span>
              </div>

              {/* Render Mockup based on type */}
              {activeTab.mockup.type === 'code' && (
                <div className="font-mono text-xs space-y-1.5 bg-[#0f121c] p-4 rounded-xl border border-slate-800 text-slate-300">
                  {activeTab.mockup.lines.map((line, idx) => (
                    <div key={idx} className="flex gap-3">
                      <span className="text-slate-600 select-none text-[11px]">{idx + 1}</span>
                      <span className={line.includes('CREATE') || line.includes('PRIMARY KEY') ? 'text-amber-300 font-semibold' : 'text-slate-200'}>
                        {line}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab.mockup.type === 'diagram' && (
                <div className="space-y-3 bg-[#0f121c] p-4 rounded-xl border border-slate-800 font-mono text-xs">
                  {activeTab.mockup.nodes.map((node) => (
                    <div key={node.name} className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <div className="flex items-center justify-between font-bold text-amber-300 text-xs pb-1 mb-1 border-b border-slate-800">
                        <span className="flex items-center gap-1">
                          <RiDatabase2Line className="text-amber-400" />
                          {node.name}
                        </span>
                        <span className="text-[10px] text-slate-500">PK: {node.pk}</span>
                      </div>
                      {node.fk.length > 0 ? (
                        <div className="text-[11px] text-sky-300 space-y-0.5">
                          {node.fk.map((fkItem, fidx) => (
                            <div key={fidx}>🔗 {fkItem}</div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-[10px] text-slate-500 italic">Root Entity</div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {activeTab.mockup.type === 'comparison' && (
                <div className="space-y-3 font-mono text-xs bg-[#0f121c] p-4 rounded-xl border border-slate-800">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-emerald-400 font-bold block mb-1">PostgreSQL Dialect</span>
                    <span className="text-slate-200">{activeTab.mockup.pg}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-sky-400 font-bold block mb-1">MySQL 8.0 Dialect</span>
                    <span className="text-slate-200">{activeTab.mockup.mysql}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-amber-400 font-bold block mb-1">SQLite 3 Dialect</span>
                    <span className="text-slate-200">{activeTab.mockup.sqlite}</span>
                  </div>
                </div>
              )}

              {activeTab.mockup.type === 'audit' && (
                <div className="space-y-3 font-mono text-xs bg-[#0f121c] p-4 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/30">
                    <span className="text-slate-200 font-bold">Schema Health Score</span>
                    <span className="text-emerald-400 font-extrabold text-lg">{activeTab.mockup.score}</span>
                  </div>
                  <div className="space-y-2">
                    {activeTab.mockup.checks.map((chk, cidx) => (
                      <div key={cidx} className="flex items-center justify-between bg-slate-900 p-2.5 rounded border border-slate-800">
                        <span className="text-slate-300">{chk.name}</span>
                        <span className="text-emerald-400 text-[11px]">{chk.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

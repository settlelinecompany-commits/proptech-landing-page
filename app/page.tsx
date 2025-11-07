"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Building2,
  Clock,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  X,
  Globe,
  DollarSign,
  FileText,
  Languages,
  Zap,
  MessageCircle,
  Users,
  Briefcase,
  LineChart,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { createClient } from "@/lib/supabase/client"

export default function Home() {
  const [showWaitlist, setShowWaitlist] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.from("waitlist").insert([{ email, source: "landing_page" }])

      if (error) {
        if (error.code === "23505") {
          toast({
            title: "Already on the list!",
            description: "You're already signed up for early access.",
          })
        } else {
          throw error
        }
      } else {
        toast({
          title: "Welcome to the waitlist!",
          description: "We'll notify you when spots open up.",
        })
        setShowWaitlist(false)
        setEmail("")
      }
    } catch (error) {
      console.error("[v0] Waitlist error:", error)
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Toaster />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-blue-600" />
            <span className="font-semibold text-lg">PropertyAI</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#how-it-works" className="text-sm hover:text-blue-600 transition-colors">
              How It Works
            </Link>
            <Link href="#team" className="text-sm hover:text-blue-600 transition-colors">
              The Team
            </Link>
            <Link href="#impact" className="text-sm hover:text-blue-600 transition-colors">
              Impact
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-violet-600 text-white"
              onClick={() => setShowWaitlist(true)}
            >
              Get Early Access
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-blue-50 via-white to-violet-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-yellow-400 text-black hover:bg-yellow-500 border-0">
              <Sparkles className="w-3 h-3 mr-1" />
              Dubai-ready & Global
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Meet Your 24/7 AI Property Team</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty leading-relaxed">
              Five AI agents that handle leasing, residents, operations, finance, and landlord updates. They never sleep
              — so you don't have to.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg hover:shadow-xl transition-all"
                onClick={() => setShowWaitlist(true)}
              >
                Join Waitlist
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
              >
                See How It Works
              </Button>
            </div>

            {/* KPI Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">&lt;60s</div>
                <div className="text-sm text-muted-foreground">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">+30%</div>
                <div className="text-sm text-muted-foreground">More Tours</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">24/7</div>
                <div className="text-sm text-muted-foreground">Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">90%</div>
                <div className="text-sm text-muted-foreground">Auto-Resolved</div>
              </div>
            </div>
          </div>

          {/* Agent Images Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
            {[
              {
                name: "Layla",
                role: "Leasing",
                color: "from-blue-500 to-blue-600",
                query: "professional female leasing agent headshot portrait",
              },
              {
                name: "Riya",
                role: "Residents",
                color: "from-pink-500 to-pink-600",
                query: "professional female resident services agent headshot portrait",
              },
              {
                name: "Omar",
                role: "Operations",
                color: "from-green-500 to-green-600",
                query: "professional male operations manager headshot portrait",
              },
              {
                name: "Farah",
                role: "Finance",
                color: "from-purple-500 to-purple-600",
                query: "professional female finance coordinator headshot portrait",
              },
              {
                name: "Nour",
                role: "Landlord Agent",
                color: "from-yellow-400 to-yellow-500",
                query: "professional female landlord relations agent headshot portrait",
              },
            ].map((agent, i) => (
              <div key={i} className="text-center group">
                <div
                  className={`w-32 h-32 mx-auto mb-3 rounded-full bg-gradient-to-br ${agent.color} overflow-hidden shadow-lg group-hover:scale-105 transition-transform flex items-center justify-center`}
                >
                  <span className="text-4xl font-bold text-white">{agent.name[0]}</span>
                </div>
                <h3 className="font-bold text-lg">{agent.name}</h3>
                <p className="text-sm text-muted-foreground">{agent.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Brickwise Style */}
      <section id="how-it-works" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How it works</h2>
            <p className="text-lg text-muted-foreground">Completely hands-free property management</p>
          </div>

          <div className="space-y-16">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-lg">
                    1
                  </div>
                  <h3 className="text-2xl font-bold">Lead comes in</h3>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  A prospect texts, calls, or fills a form. Layla instantly qualifies them, answers questions, and books
                  a tour — no human needed.
                </p>
              </div>
              <div className="flex-1">
                <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <div className="flex items-start gap-3 mb-4">
                    <MessageCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Prospect</p>
                      <p className="font-medium">Hi, is the 2BR in Marina still available?</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white rounded-lg p-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm flex-shrink-0">
                      L
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Layla</p>
                      <p className="text-sm">
                        Yes! It's available at AED 95k/year. I can book you a viewing today at 3pm or tomorrow at 10am?
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-pink-600 text-white font-bold flex items-center justify-center text-lg">
                    2
                  </div>
                  <h3 className="text-2xl font-bold">Resident moves in</h3>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Riya handles onboarding, sends rent reminders, answers everyday questions, and manages lease renewals.
                  Your tenants feel heard 24/7.
                </p>
              </div>
              <div className="flex-1">
                <Card className="p-6 bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 bg-white rounded-lg p-3">
                      <CheckCircle2 className="w-5 h-5 text-pink-600" />
                      <span className="text-sm font-medium">Welcome email sent</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white rounded-lg p-3">
                      <CheckCircle2 className="w-5 h-5 text-pink-600" />
                      <span className="text-sm font-medium">Rent reminder scheduled</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white rounded-lg p-3">
                      <CheckCircle2 className="w-5 h-5 text-pink-600" />
                      <span className="text-sm font-medium">Renewal check-in: 60 days</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-green-600 text-white font-bold flex items-center justify-center text-lg">
                    3
                  </div>
                  <h3 className="text-2xl font-bold">Maintenance request</h3>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Omar triages the issue, contacts your approved vendors, schedules the fix, and keeps everyone updated.
                  No chasing, no delays.
                </p>
              </div>
              <div className="flex-1">
                <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">AC not cooling - Unit 3B</span>
                      <Badge className="bg-green-600 text-white">In Progress</Badge>
                    </div>
                    <div className="h-px bg-green-200" />
                    <p className="text-muted-foreground">Vendor: CoolTech HVAC</p>
                    <p className="text-muted-foreground">Scheduled: Today, 2:00 PM</p>
                    <p className="text-muted-foreground">Tenant notified ✓</p>
                  </div>
                </Card>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-lg">
                    4
                  </div>
                  <h3 className="text-2xl font-bold">Invoices & books</h3>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Farah generates invoices, tracks payments, reconciles accounts, and syncs everything to your
                  accounting software. Books balanced, automatically.
                </p>
              </div>
              <div className="flex-1">
                <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Monthly Revenue</span>
                      <span className="font-bold text-purple-600">AED 285,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Outstanding</span>
                      <span className="font-bold">AED 12,500</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Invoices Sent</span>
                      <span className="font-bold">24 / 24</span>
                    </div>
                    <div className="h-px bg-purple-200 my-2" />
                    <p className="text-xs text-muted-foreground">✓ Synced to QuickBooks</p>
                  </div>
                </Card>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-400 text-black font-bold flex items-center justify-center text-lg">
                    5
                  </div>
                  <h3 className="text-2xl font-bold">Landlord updates</h3>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Nour sends real-time portfolio summaries to your owners. Occupancy rates, revenue, maintenance status
                  — all automated, all accurate.
                </p>
              </div>
              <div className="flex-1">
                <Card className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
                  <h4 className="font-bold mb-3">Marina Tower - March Summary</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Occupancy</p>
                      <p className="font-bold">95%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Revenue</p>
                      <p className="font-bold">↑ 8%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Renewals</p>
                      <p className="font-bold">4 / 5</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Tickets</p>
                      <p className="font-bold">All closed</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Team Personas */}
      <section id="team" className="py-20 px-4 bg-gradient-to-br from-blue-50 to-violet-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Your AI Team</h2>
            <p className="text-lg text-muted-foreground">
              Five specialists, one mission: automate your property operations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Layla",
                role: "Leasing Agent",
                tagline: "Never miss a tour slot",
                color: "from-blue-500 to-blue-600",
                icon: Users,
                query: "professional female leasing agent headshot portrait",
                desc: "Qualifies leads, answers inquiries 24/7, books property tours instantly.",
                metrics: [
                  { label: "Lead-to-Lease", value: "↑25%" },
                  { label: "Response", value: "<60s" },
                ],
              },
              {
                name: "Riya",
                role: "Resident Services",
                tagline: "Your residents, always heard",
                color: "from-pink-500 to-pink-600",
                icon: MessageCircle,
                query: "professional female resident services agent headshot portrait",
                desc: "Handles move-ins, rent reminders, resident questions, and renewals.",
                metrics: [
                  { label: "Renewals", value: "↑20%" },
                  { label: "Satisfaction", value: "95%" },
                ],
              },
              {
                name: "Omar",
                role: "Operations Manager",
                tagline: "No ticket left hanging",
                color: "from-green-500 to-green-600",
                icon: Zap,
                query: "professional male operations manager headshot portrait",
                desc: "Triages maintenance, coordinates vendors, ensures SLA compliance.",
                metrics: [
                  { label: "SLA", value: "↑35%" },
                  { label: "Resolution", value: "↓40%" },
                ],
              },
              {
                name: "Farah",
                role: "Finance Coordinator",
                tagline: "Books balanced before breakfast",
                color: "from-purple-500 to-purple-600",
                icon: Briefcase,
                query: "professional female finance coordinator headshot portrait",
                desc: "Automates invoicing, tracks payments, reconciles accounts, generates reports.",
                metrics: [
                  { label: "Speed", value: "↑85%" },
                  { label: "Accuracy", value: "99.9%" },
                ],
              },
              {
                name: "Nour",
                role: "Landlord Agent",
                tagline: "Your portfolio on autopilot",
                color: "from-yellow-400 to-yellow-500",
                icon: LineChart,
                query: "professional female landlord relations agent headshot portrait",
                desc: "Updates landlords with real-time portfolio insights and revenue summaries.",
                metrics: [
                  { label: "Manual Work", value: "↓60%" },
                  { label: "Updates", value: "Real-time" },
                ],
              },
            ].map((persona, i) => (
              <Card
                key={i}
                className="p-6 hover:shadow-xl transition-all group cursor-pointer border-2 hover:border-blue-200"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${persona.color} overflow-hidden flex items-center justify-center`}>
                    <span className="text-2xl font-bold text-white">{persona.name[0]}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-1">{persona.name}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{persona.role}</p>
                    <p className="text-sm font-medium italic text-blue-600">"{persona.tagline}"</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed">{persona.desc}</p>
                <div className="flex gap-3">
                  {persona.metrics.map((metric, j) => (
                    <div key={j} className="bg-blue-50 rounded-lg px-3 py-2 flex-1">
                      <div className="text-xs text-muted-foreground mb-1">{metric.label}</div>
                      <div className="font-bold text-blue-600">{metric.value}</div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section id="impact" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">The impact</h2>
            <p className="text-lg text-muted-foreground">Real results from property teams using AI</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { metric: "Lead-to-Lease", value: "↑25%", icon: TrendingUp },
              { metric: "Response Time", value: "<60s", icon: Clock },
              { metric: "Renewals", value: "↑20%", icon: CheckCircle2 },
              { metric: "SLA Compliance", value: "↑35%", icon: Building2 },
            ].map((item, i) => (
              <Card
                key={i}
                className="p-6 text-center hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-blue-50 border-blue-100"
              >
                <item.icon className="w-10 h-10 mx-auto mb-4 text-blue-600" />
                <div className="text-3xl font-bold text-blue-600 mb-2">{item.value}</div>
                <div className="text-sm text-muted-foreground font-medium">{item.metric}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dubai Features */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-yellow-400 text-black hover:bg-yellow-500 border-0">
              <Globe className="w-3 h-3 mr-1" />
              Built for Dubai & NRI Investors
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Cross-border made simple</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Specialized features for Dubai properties and global owners
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Ejari Sync",
                desc: "Auto lease verification",
                icon: FileText,
                color: "text-blue-600",
              },
              {
                title: "Multi-Currency",
                desc: "AED / USD / INR conversion",
                icon: DollarSign,
                color: "text-green-600",
              },
              {
                title: "Tax Integration",
                desc: "RNOR / Form 67 support",
                icon: CheckCircle2,
                color: "text-purple-600",
              },
              {
                title: "Bilingual UI",
                desc: "Arabic + English",
                icon: Languages,
                color: "text-pink-600",
              },
            ].map((feature, i) => (
              <Card key={i} className="p-6 text-center hover:shadow-lg transition-shadow">
                <feature.icon className={`w-10 h-10 mx-auto mb-4 ${feature.color}`} />
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 bg-gradient-to-br from-blue-600 to-violet-700 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Your properties deserve a team that never sleeps
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join the waitlist and be among the first to experience AI-powered property management.
          </p>
          <Button
            size="lg"
            className="bg-yellow-400 text-black hover:bg-yellow-500 shadow-xl hover:shadow-2xl transition-all"
            onClick={() => setShowWaitlist(true)}
          >
            Join Waitlist
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-gray-400 text-center">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Building2 className="h-5 w-5 text-white" />
            <span className="font-semibold text-white">PropertyAI</span>
          </div>
          <p className="text-sm">© 2025 PropertyAI. All rights reserved.</p>
        </div>
      </footer>

      {/* Waitlist Modal */}
      {showWaitlist && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowWaitlist(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold mb-2">Join the Waitlist</h2>
            <p className="text-muted-foreground mb-6">Get early access when we launch</p>
            <form onSubmit={handleWaitlistSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <Input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Joining..." : "Get Early Access"}
              </Button>
            </form>
          </Card>
        </div>
      )}
    </div>
  )
}

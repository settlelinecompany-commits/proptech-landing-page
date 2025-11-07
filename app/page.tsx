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
  Wrench,
  Calendar,
  LayoutDashboard,
  CreditCard,
  Smartphone,
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
            <Link href="#dashboard" className="text-sm hover:text-blue-600 transition-colors">
              Dashboard
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Your 24/7 AI Property Team</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty leading-relaxed">
              Four friendly AI teammates that sit on top of your CRM and handle leasing, residents, maintenance—and roll it all up for you every morning.
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
                <Clock className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-3xl font-bold text-blue-600 mb-1">&lt;60s</div>
                <div className="text-sm text-muted-foreground">Response Time</div>
              </div>
              <div className="text-center">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-3xl font-bold text-blue-600 mb-1">+20–30%</div>
                <div className="text-sm text-muted-foreground">More Tours</div>
              </div>
              <div className="text-center">
                <Wrench className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-3xl font-bold text-blue-600 mb-1">↑ First-time-fix</div>
                <div className="text-sm text-muted-foreground">Rate</div>
              </div>
              <div className="text-center">
                <Globe className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-3xl font-bold text-blue-600 mb-1">100+</div>
                <div className="text-sm text-muted-foreground">Languages</div>
              </div>
            </div>
          </div>

          {/* Agent Images Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              {
                name: "Layla",
                role: "Leasing",
                color: "from-blue-500 to-blue-600",
              },
              {
                name: "Riya",
                role: "Residents",
                color: "from-pink-500 to-pink-600",
              },
              {
                name: "Fahd",
                role: "Maintenance",
                color: "from-green-500 to-green-600",
              },
              {
                name: "Omar",
                role: "Operations",
                color: "from-purple-500 to-purple-600",
              },
            ].map((agent, i) => (
              <div key={i} className="text-center group">
                <div
                  className={`w-32 h-32 mx-auto mb-3 rounded-full bg-gradient-to-br ${agent.color} overflow-hidden shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300 flex items-center justify-center`}
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

      {/* How It Works */}
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
                  Fahd captures the issue, creates clean work orders, schedules the fix, and keeps everyone updated.
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
                  <h3 className="text-2xl font-bold">Daily roll-up</h3>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Omar pulls updates from Layla, Riya, and Fahd, then shows you one clean dashboard every morning.
                  Tours, tickets, move-ins/outs, renewals — clear priorities, zero noise.
                </p>
              </div>
              <div className="flex-1">
                <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                  <h4 className="font-bold mb-3">Today's Summary</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Tours booked</p>
                      <p className="font-bold">12</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Open tickets</p>
                      <p className="font-bold">8</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Move-ins today</p>
                      <p className="font-bold">2</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Renewals due</p>
                      <p className="font-bold">4</p>
                    </div>
                  </div>
                  <div className="h-px bg-purple-200 my-3" />
                  <p className="text-xs text-muted-foreground">✓ Only what needs you</p>
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
            <h2 className="text-4xl font-bold mb-4">Meet the Team</h2>
            <p className="text-lg text-muted-foreground">
              Four friendly AI teammates that work together seamlessly
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                name: "Layla",
                tagline: "The Matchmaker",
                role: "Leasing",
                color: "from-blue-500 to-blue-600",
                talksTo: "Tenants/prospects (WhatsApp/website)",
                superpower: "Books tours fast and keeps conversation warm",
                goals: ["↑ Lead→Lease", "↓ Response time", "+20–30% more tours"],
                loop: "Instant reply → slot offer → confirm → remind → follow-up → (flag for human if needed)",
                whatPMSees: "More tours on calendar, fewer drop-offs",
              },
              {
                name: "Riya",
                tagline: "Tenant's Best Friend",
                role: "Resident",
                color: "from-pink-500 to-pink-600",
                talksTo: "Tenants (chat, voice, app) - speaks 100+ languages",
                superpower: "Friendly answers, smooth move-ins/renewals, gentle rent nudges",
                goals: ["↑ CSAT/NPS", "↑ Renewals", "↑ On-time payments"],
                loop: "Answer anything → welcome kit & checklist → reminders (rent/amenities) → renewal nudges → move-out checklist",
                whatPMSees: "Fewer 'any update?' pings, earlier renewal decisions",
              },
              {
                name: "Fahd",
                tagline: "Mr. Fix-It",
                role: "Maintenance",
                color: "from-green-500 to-green-600",
                talksTo: "Tenants (intake only). Logs everything to CRM",
                superpower: "Turns chaos into clean work orders that techs can close fast",
                goals: ["↓ Time-to-ack", "↑ First-time-fix", "↓ Unnecessary dispatches"],
                loop: "Capture issue (photos/video) → quick troubleshooting → create ticket (clear priority) → status nudges → close & feedback",
                whatPMSees: "Fewer repeats, faster turnarounds, clean proof-of-work",
              },
              {
                name: "Omar",
                tagline: "Right-Hand Man",
                role: "Operations",
                color: "from-purple-500 to-purple-600",
                talksTo: "Layla, Riya, Fahd (to collect updates) and PMC/Landlord (to report)",
                superpower: "One clean daily picture of whole portfolio. No tenant chat.",
                goals: ["↑ Operational clarity", "↓ Admin time", "↑ On-time actions"],
                loop: "Pulls updates from agents → cleans numbers → shows today's priorities → saves proofs → pings only when action needed",
                whatPMSees: "Daily dashboard with tours, tickets, move-ins/outs, renewals",
              },
            ].map((persona, i) => (
              <Card
                key={i}
                className="p-6 hover:shadow-xl transition-all group cursor-pointer border-2 hover:border-blue-200"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${persona.color} overflow-hidden flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <span className="text-2xl font-bold text-white">{persona.name[0]}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-1">{persona.name}</h3>
                    <p className="text-sm font-medium italic text-blue-600 mb-1">"{persona.tagline}"</p>
                    <p className="text-sm text-muted-foreground">{persona.role}</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Talks to</p>
                    <p className="text-sm">{persona.talksTo}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Superpower</p>
                    <p className="text-sm font-medium">{persona.superpower}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Goals</p>
                    <div className="flex flex-wrap gap-2">
                      {persona.goals.map((goal, j) => (
                        <Badge key={j} variant="outline" className="text-xs">
                          {goal}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">What PM sees</p>
                  <p className="text-sm text-muted-foreground">{persona.whatPMSees}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What You See Each Morning - Omar's Dashboard */}
      <section id="dashboard" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What You See Each Morning</h2>
            <p className="text-lg text-muted-foreground">Omar's daily roll-up—clear priorities, zero noise</p>
          </div>

          <Card className="p-8 bg-gradient-to-br from-white to-blue-50 border-blue-200">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Today's Numbers</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Leasing */}
              <Card className="p-6 bg-white border-2">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-lg">Leasing</h4>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tours booked</span>
                    <span className="font-bold">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">No-show risk</span>
                    <span className="font-bold text-amber-600">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Hot leads</span>
                    <span className="font-bold text-blue-600">5</span>
                  </div>
                </div>
              </Card>

              {/* Maintenance */}
              <Card className="p-6 bg-white border-2">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-lg">Maintenance</h4>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">New WOs</span>
                    <span className="font-bold">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Open</span>
                    <span className="font-bold">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Overdue</span>
                    <span className="font-bold text-red-600">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">SLA status</span>
                    <span className="font-bold text-green-600">95%</span>
                  </div>
                </div>
              </Card>

              {/* Residents */}
              <Card className="p-6 bg-white border-2">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-lg">Residents</h4>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Move-ins today</span>
                    <span className="font-bold">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Renewals due</span>
                    <span className="font-bold text-amber-600">4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Move-outs this week</span>
                    <span className="font-bold">1</span>
                  </div>
                </div>
              </Card>
            </div>

            <div className="pt-6 border-t">
              <h4 className="font-bold text-lg mb-3">Only what needs you</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                  <span>2 tour confirmations pending</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span>1 maintenance ticket requires approval</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span>Renewal decision needed: Unit 3B (3 days)</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Plugs Into Your Stack */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Plugs Right Into Your CRM</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-2">
              No need to replace what you use — our agents plug in, sync, and start working instantly.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {[
              { name: "Yardi" },
              { name: "HubSpot" },
              { name: "Zoho" },
              { name: "Salesforce" },
              { name: "AppFolio" },
              { name: "Buildium" },
              { name: "WhatsApp" },
              { name: "Calendar" },
            ].map((integration, i) => (
              <Card
                key={i}
                className="p-6 hover:shadow-lg transition-all hover:scale-110 cursor-pointer border-2 hover:border-blue-200 min-w-[140px]"
              >
                <p className="text-base font-bold text-center text-gray-800">{integration.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Proof & Love */}
      <section id="impact" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Proof & Love</h2>
          </div>

          <Card className="p-8 bg-gradient-to-br from-white to-blue-50 border-blue-200">
            <div className="text-center">
              <p className="text-xl text-muted-foreground italic mb-6 leading-relaxed">
                "Response times dropped under a minute and we stopped chasing updates. The dashboard tells me exactly what matters."
              </p>
              <p className="text-sm font-medium text-muted-foreground">
                — Property Manager, Dubai
              </p>
            </div>
          </Card>
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


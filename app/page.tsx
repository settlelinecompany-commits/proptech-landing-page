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
import Image from "next/image"
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
      if (!supabase) {
        toast({
          title: "Configuration error",
          description: "Please contact us directly to join the waitlist.",
          variant: "destructive",
        })
        return
      }
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
              className="bg-gradient-to-r from-indigo-600 to-slate-700 text-white shadow-md hover:shadow-lg transition-all"
              onClick={() => setShowWaitlist(true)}
            >
              Join Waitlist
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
              Four AI teammates that plug into your CRM - handling leasing, residents, and maintenance, then rolling it all up for you every morning.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-slate-700 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all font-semibold rounded-full px-8 py-6"
                onClick={() => setShowWaitlist(true)}
              >
                Join Waitlist
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700 hover:border-gray-600 rounded-full px-8 py-6"
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
              >
                See How It Works
              </Button>
            </div>

            {/* KPI Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16">
              <div className="text-center">
                <Clock className="w-8 h-8 mx-auto mb-2" style={{ color: '#F97316' }} />
                <div className="text-3xl font-bold mb-1" style={{ color: '#F97316' }}>&lt;60s</div>
                <div className="text-sm text-muted-foreground">Response Time</div>
              </div>
              <div className="text-center">
                <Calendar className="w-8 h-8 mx-auto mb-2" style={{ color: '#F97316' }} />
                <div className="text-3xl font-bold mb-1" style={{ color: '#F97316' }}>+20-30%</div>
                <div className="text-sm text-muted-foreground">More Tours</div>
              </div>
              <div className="text-center">
                <Wrench className="w-8 h-8 mx-auto mb-2" style={{ color: '#EAB308' }} />
                <div className="text-3xl font-bold mb-1" style={{ color: '#EAB308' }}>↑ Fix Rate</div>
                <div className="text-sm text-muted-foreground">First-time</div>
              </div>
              <div className="text-center">
                <Globe className="w-8 h-8 mx-auto mb-2" style={{ color: '#14B8A6' }} />
                <div className="text-3xl font-bold mb-1" style={{ color: '#14B8A6' }}>100+</div>
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
                image: "/layla.png",
              },
              {
                name: "Riya",
                role: "Residents",
                image: "/riya.png",
              },
              {
                name: "Fahd",
                role: "Maintenance",
                image: "/fahd.png",
              },
              {
                name: "Omar",
                role: "Operations",
                image: "/omar.png",
              },
            ].map((agent, i) => {
              const colors = {
                Layla: "text-orange-500 border-orange-200",
                Riya: "text-teal-500 border-teal-200",
                Fahd: "text-amber-500 border-amber-200",
                Omar: "text-blue-800 border-blue-200",
              }
              const agentColor = colors[agent.name as keyof typeof colors] || ""
              return (
              <div key={i} className="text-center group">
                  <div className="w-32 h-32 mx-auto mb-3 rounded-full overflow-hidden shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300 relative border-2 group-hover:border-opacity-100 border-opacity-0 transition-all">
                    <Image
                      src={agent.image}
                    alt={agent.name}
                      width={128}
                      height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                  <h3 className={`font-bold text-lg ${agentColor.split(' ')[0]}`}>{agent.name}</h3>
                <p className="text-sm text-muted-foreground">{agent.role}</p>
              </div>
              )
            })}
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
                  <div className="w-10 h-10 rounded-full text-white font-bold flex items-center justify-center text-lg" style={{ backgroundColor: '#F97316' }}>
                    1
                  </div>
                  <div className="w-12 h-12 rounded-full overflow-hidden shadow-md border-2" style={{ borderColor: '#F97316' }}>
                    <Image
                      src="/layla.png"
                      alt="Layla"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold">Lead comes in</h3>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  A prospect texts, calls, or fills a form. Layla instantly qualifies them, answers questions, and books
                  a tour - no human needed.
                </p>
              </div>
              <div className="flex-1">
                <Card className="p-6 bg-gradient-to-br from-orange-50 to-rose-50 border-2" style={{ borderColor: '#F97316' }}>
                  <div className="flex items-start gap-3 mb-4">
                    <MessageCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#F97316' }} />
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Prospect</p>
                      <p className="font-medium">Hi, is the 2BR in Marina still available?</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white rounded-lg p-3">
                    <div className="w-8 h-8 rounded-full text-white font-bold flex items-center justify-center text-sm flex-shrink-0" style={{ backgroundColor: '#F97316' }}>
                      L
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Layla</p>
                      <p className="text-sm">
                        Yes! The 2BR at Marina View is available for AED 95K/year. I can book you today at 3 PM or tomorrow at 10 AM - what works better?
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
                  <div className="w-10 h-10 rounded-full text-white font-bold flex items-center justify-center text-lg" style={{ backgroundColor: '#14B8A6' }}>
                    2
                  </div>
                  <div className="w-12 h-12 rounded-full overflow-hidden shadow-md border-2" style={{ borderColor: '#14B8A6' }}>
                    <Image
                      src="/riya.png"
                      alt="Riya"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold">Resident moves in</h3>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Riya handles onboarding, sends rent reminders via WhatsApp/email in 100+ languages, answers everyday questions, and manages lease renewals.
                  Your tenants feel heard 24/7.
                </p>
              </div>
              <div className="flex-1">
                <Card className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 border-2" style={{ borderColor: '#14B8A6' }}>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 bg-white rounded-lg p-3">
                      <CheckCircle2 className="w-5 h-5" style={{ color: '#14B8A6' }} />
                      <span className="text-sm font-medium">Welcome email sent</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white rounded-lg p-3">
                      <CheckCircle2 className="w-5 h-5" style={{ color: '#14B8A6' }} />
                      <span className="text-sm font-medium">Rent reminder scheduled</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white rounded-lg p-3">
                      <CheckCircle2 className="w-5 h-5" style={{ color: '#14B8A6' }} />
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
                  <div className="w-10 h-10 rounded-full text-white font-bold flex items-center justify-center text-lg" style={{ backgroundColor: '#EAB308' }}>
                    3
                  </div>
                  <div className="w-12 h-12 rounded-full overflow-hidden shadow-md border-2" style={{ borderColor: '#EAB308' }}>
                    <Image
                      src="/fahd.png"
                      alt="Fahd"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold">Maintenance request</h3>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Fahd captures the issue, creates clean work orders, schedules the fix, and keeps everyone updated.
                  No chasing, no delays.
                </p>
                <div className="mt-3 flex gap-4 text-sm font-medium" style={{ color: '#EAB308' }}>
                  <span>↓ time-to-fix</span>
                  <span>↑ first-time completion</span>
                </div>
              </div>
              <div className="flex-1">
                <Card className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 border-2" style={{ borderColor: '#EAB308' }}>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">AC not cooling - Unit 3B</span>
                      <Badge className="text-white" style={{ backgroundColor: '#EAB308' }}>In Progress</Badge>
                    </div>
                    <div className="h-px" style={{ backgroundColor: '#EAB308' }} />
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
                  <div className="w-10 h-10 rounded-full text-white font-bold flex items-center justify-center text-lg" style={{ backgroundColor: '#1E3A8A' }}>
                    4
                  </div>
                  <div className="w-12 h-12 rounded-full overflow-hidden shadow-md border-2" style={{ borderColor: '#1E3A8A' }}>
                    <Image
                      src="/omar.png"
                      alt="Omar"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold">Daily roll-up</h3>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Omar pulls updates from Layla, Riya, and Fahd, then shows you one clean dashboard every morning.
                  Tours, tickets, move-ins/outs, renewals - clear priorities, zero noise.
                </p>
                <p className="mt-3 text-sm italic font-medium" style={{ color: '#1E3A8A' }}>
                  "Every morning, I know exactly what matters - no more chasing updates."
                </p>
              </div>
              <div className="flex-1">
                <Card className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 border-2" style={{ borderColor: '#1E3A8A' }}>
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
      <section id="team" className="py-20 px-4 bg-gradient-to-br from-slate-50 to-gray-50">
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
                image: "/layla.png",
                talksTo: "Tenants/prospects (WhatsApp/website)",
                superpower: "Books tours fast and keeps conversation warm",
                goals: ["↑ Lead→Lease", "↓ Response time", "+20-30% more tours"],
                loop: "Instant reply → slot offer → confirm → remind → follow-up → (flag for human if needed)",
                whatPMSees: "More tours on calendar, fewer drop-offs",
              },
              {
                name: "Riya",
                tagline: "Tenant's Best Friend",
                role: "Resident",
                image: "/riya.png",
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
                image: "/fahd.png",
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
                image: "/omar.png",
                talksTo: "Layla, Riya, Fahd (to collect updates) and PMC/Landlord (to report)",
                superpower: "One clean daily picture of whole portfolio. No tenant chat.",
                goals: ["↑ Operational clarity", "↓ Admin time", "↑ On-time actions"],
                loop: "Pulls updates from agents → cleans numbers → shows today's priorities → saves proofs → pings only when action needed",
                whatPMSees: "Daily dashboard with tours, tickets, move-ins/outs, renewals",
              },
            ].map((persona, i) => (
              <Card
                key={i}
                className="p-6 hover:shadow-xl transition-all group cursor-pointer border-2"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center group-hover:scale-110 transition-transform relative">
                    <Image
                      src={persona.image}
                      alt={persona.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-1">{persona.name}</h3>
                    <p className="text-sm font-medium italic mb-1" style={{
                      color: persona.name === "Layla" ? "#F97316" :
                             persona.name === "Riya" ? "#14B8A6" :
                             persona.name === "Fahd" ? "#EAB308" :
                             "#1E3A8A"
                    }}>"{persona.tagline}"</p>
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
      <section id="dashboard" className="py-20 px-4 bg-slate-100">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900">What You See Each Morning</h2>
            <p className="text-lg text-slate-600">Omar's daily roll-up - clear priorities, zero noise</p>
          </div>

          <Card className="p-8 bg-white border-slate-200 shadow-lg">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Today's Numbers</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Leasing */}
              <Card className="p-6 bg-white border-2 shadow-md" style={{ borderColor: '#F97316' }}>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-lg">Leasing</h4>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#F97316' }}></div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tours booked</span>
                    <span className="font-bold" style={{ color: '#F97316' }}>12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">No-show risk</span>
                    <span className="font-bold text-amber-600">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Hot leads</span>
                    <span className="font-bold" style={{ color: '#F97316' }}>5</span>
                  </div>
                </div>
              </Card>

              {/* Maintenance */}
              <Card className="p-6 bg-white border-2 shadow-md rounded-lg" style={{ borderColor: '#EAB308' }}>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-lg">Maintenance</h4>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#EAB308' }}></div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">New WOs</span>
                    <span className="font-bold" style={{ color: '#EAB308' }}>3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Open</span>
                    <span className="font-bold" style={{ color: '#EAB308' }}>8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Overdue</span>
                    <span className="font-bold text-red-600">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">SLA status</span>
                    <span className="font-bold" style={{ color: '#EAB308' }}>95%</span>
                  </div>
                </div>
              </Card>

              {/* Residents */}
              <Card className="p-6 bg-white border-2 shadow-md rounded-lg" style={{ borderColor: '#14B8A6' }}>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-lg">Residents</h4>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#14B8A6' }}></div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Move-ins today</span>
                    <span className="font-bold" style={{ color: '#14B8A6' }}>2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Renewals due</span>
                    <span className="font-bold" style={{ color: '#14B8A6' }}>4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Move-outs this week</span>
                    <span className="font-bold" style={{ color: '#14B8A6' }}>1</span>
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
              No need to replace what you use - our agents plug in, sync, and start working instantly.
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

      {/* Final CTA */}
      <section className="py-24 px-4 bg-gradient-to-br from-slate-800 via-indigo-900 to-slate-900 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Your properties deserve a team that never sleeps
          </h2>
          <p className="text-xl text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join the waitlist and be among the first to experience AI-powered property management.
          </p>
          <Button
            size="lg"
              className="bg-gradient-to-r from-indigo-600 to-slate-700 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all font-bold text-lg px-8 py-6 rounded-full"
            onClick={() => setShowWaitlist(true)}
          >
            Join Waitlist
              <ArrowRight className="ml-2 h-5 w-5" />
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
                {isSubmitting ? "Joining..." : "Join Waitlist"}
              </Button>
            </form>
          </Card>
        </div>
      )}
    </div>
  )
}


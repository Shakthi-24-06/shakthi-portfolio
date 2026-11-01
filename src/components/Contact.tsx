import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle2, Copy, Sparkles, AlertCircle, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import emailjs from '@emailjs/browser';
import { AnimeCharacter } from './AnimeCharacter';
import { soundManager } from '../utils/soundEffects';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    botcheck: '', // Anti-spam honeypot field
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showMailtoFallback, setShowMailtoFallback] = useState(false);

  const emailAddress = 'sshakthi1024@gmail.com';
  const linkedinUrl = 'https://www.linkedin.com/in/shakthi-sivakumar';
  const githubUrl = 'https://github.com/Shakthi-24-06';

  const handleCopyEmail = () => {
    soundManager.playClick();
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setShowMailtoFallback(false);

    // 1. Spam honeypot detection
    if (formData.botcheck) {
      // Silently discard bot submissions
      return;
    }

    // 2. Form field validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields (Name, Email, and Message).');
      return;
    }

    if (formData.name.trim().length < 2) {
      setErrorMessage('Please enter a valid name (at least 2 characters).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (formData.message.trim().length < 10) {
      setErrorMessage('Please provide a message with at least 10 characters.');
      return;
    }

    setIsSubmitting(true);
    soundManager.playClick();

    // Check environment variables for EmailJS (Gmail Service)
    const emailJsService = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const emailJsTemplate = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const emailJsPublic = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const isEmailJsConfigured = Boolean(
      emailJsService &&
      emailJsTemplate &&
      emailJsPublic &&
      !emailJsService.includes('your_') &&
      !emailJsTemplate.includes('your_') &&
      !emailJsPublic.includes('your_')
    );

    if (!isEmailJsConfigured) {
      setIsSubmitting(false);
      setShowMailtoFallback(true);
      setErrorMessage(
        'Direct delivery setup pending: Please configure VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in your .env file. In the meantime, you can click below to send directly via your email client.'
      );
      return;
    }

    try {
      const templateParams = {
        name: formData.name.trim(),
        from_name: formData.name.trim(),
        email: formData.email.trim(),
        from_email: formData.email.trim(),
        reply_to: formData.email.trim(),
        to_name: 'Shakthi Sivakumar',
        to_email: emailAddress,
        message: formData.message.trim(),
      };

      const result = await emailjs.send(
        emailJsService,
        emailJsTemplate,
        templateParams,
        emailJsPublic
      );

      if (result.status === 200 || result.text === 'OK') {
        setIsSent(true);

        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#00f0ff', '#a855f7', '#38bdf8', '#c084fc'],
        });
      } else {
        throw new Error(`Email service responded with status code: ${result.status}`);
      }
    } catch (err: unknown) {
      const errorMsg =
        err && typeof err === 'object' && 'text' in err
          ? String((err as { text: unknown }).text)
          : err instanceof Error
          ? err.message
          : 'Unable to deliver message at this time.';

      setShowMailtoFallback(true);
      setErrorMessage(`Delivery failed: ${errorMsg}. Please check your connection or send directly via your mail client.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full py-24 px-4 sm:px-6 lg:px-12 flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute bottom-1/3 left-1/4 w-[700px] h-[600px] rounded-full bg-cyan-600/10 blur-[180px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-['Outfit'] tracking-tight">
            Let's Connect!
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Have a project in mind or just want to say hi? I'd love to hear from you!
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Direct Info & Anime Character */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start space-y-8">
            <div className="w-full glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 space-y-6">
              <h3 className="text-lg font-bold text-white font-['Outfit']">
                Direct Channels
              </h3>

              <div className="space-y-4">
                {/* Email Channel */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-mono text-slate-400">
                        Email Channel
                      </div>
                      <a
                        href={`mailto:${emailAddress}`}
                        className="text-xs sm:text-sm font-semibold text-white hover:text-cyan-300 transition-colors"
                      >
                        Send an Email
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex-shrink-0 ml-2"
                    title="Copy Email"
                  >
                    {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* LinkedIn Channel */}
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => soundManager.playHover()}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                      <LinkedinIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-mono text-slate-400">
                        LinkedIn Profile
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                        shakthi-sivakumar
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-cyan-400 font-mono">Connect →</span>
                </a>

                {/* GitHub Channel */}
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => soundManager.playHover()}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0">
                      <GithubIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-mono text-slate-400">
                        GitHub Profile
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
                        Shakthi-24-06
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-purple-400 font-mono">View Repos →</span>
                </a>

                {/* Location Badge */}
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900/40 border border-slate-800/60 text-xs text-slate-400">
                  <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>Tamil Nadu, India</span>
                </div>
              </div>
            </div>

            {/* Anime Girl in Cheerful Contact Pose */}
            <div className="w-full flex justify-center">
              <AnimeCharacter pose="contact" size="md" interactive={true} />
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-6 sm:p-10 rounded-3xl border border-cyan-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-white font-['Outfit'] mb-2">
                Send a Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-6">
                Deliver your message directly to my inbox. I will get back to you as soon as possible.
              </p>

              {errorMessage && (
                <div className="mb-5 p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs space-y-2">
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{errorMessage}</span>
                  </div>
                  {showMailtoFallback && (
                    <div className="pt-2 pl-6">
                      <a
                        href={`mailto:${emailAddress}?subject=${encodeURIComponent(`Portfolio Message from ${formData.name.trim() || 'Visitor'}`)}&body=${encodeURIComponent(
                          `Hi Shakthi,\n\nName: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\n\nMessage:\n${formData.message.trim()}\n`
                        )}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-semibold transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Send via Email Client (Pre-filled)</span>
                      </a>
                    </div>
                  )}
                </div>
              )}

              {isSent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-4"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">
                      Message Delivered Successfully!
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto leading-relaxed">
                      Thank you, <span className="text-cyan-300 font-semibold">{formData.name}</span>. Your message has been sent successfully! I will get back to you at <span className="text-cyan-300 font-mono">{formData.email}</span> shortly.
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        setIsSent(false);
                        setFormData({ name: '', email: '', message: '', botcheck: '' });
                      }}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Anti-spam Honeypot field (hidden from genuine visitors) */}
                  <input
                    type="text"
                    name="botcheck"
                    value={formData.botcheck}
                    onChange={(e) => setFormData({ ...formData, botcheck: e.target.value })}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 font-mono">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700/80 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-xs sm:text-sm text-white placeholder-slate-500 disabled:opacity-50"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 font-mono">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700/80 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-xs sm:text-sm text-white placeholder-slate-500 disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 font-mono">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700/80 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-xs sm:text-sm text-white placeholder-slate-500 resize-none disabled:opacity-50"
                    />
                  </div>

                  {/* Submit Button (Exact text: Send Message) */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onMouseEnter={() => soundManager.playHover()}
                    className="w-full py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-300 via-cyan-400 to-sky-400 hover:from-cyan-200 hover:to-sky-300 shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all flex items-center justify-center gap-2 transform active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2 text-slate-900 font-bold">
                        <span className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

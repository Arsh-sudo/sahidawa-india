"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RotateCw, Home } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo });
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleReload = (): void => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      const isDev = process.env.NODE_ENV === "development";
      return (
        <main className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white shadow-sm p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-5">
              <AlertTriangle size={32} className="text-emerald-600" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 mb-2">
              Unexpected Error
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 mb-3">
              Something went wrong
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              An unexpected error occurred in this section. Your data is safe — please try reloading.
            </p>
            {isDev && this.state.error && (
              <details className="w-full rounded-2xl bg-slate-100 border border-slate-200 p-3 mb-6 text-left">
                <summary className="text-[10px] font-bold uppercase tracking-widest text-slate-500 cursor-pointer mb-2">
                  Error details (dev only)
                </summary>
                <p className="text-xs font-mono text-slate-700 break-words">
                  {this.state.error.toString()}
                </p>
                {this.state.errorInfo && (
                  <p className="text-[10px] font-mono text-slate-500 mt-1 whitespace-pre-wrap">
                    {this.state.errorInfo.componentStack}
                  </p>
                )}
              </details>
            )}
            <div className="w-full flex flex-col sm:flex-row gap-3">
              <button
                onClick={this.handleReload}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 text-white rounded-full px-6 py-3 font-bold shadow-xl shadow-emerald-600/20 hover:bg-emerald-700 transition-colors"
              >
                <RotateCw size={18} />
                Reload Page
              </button>
             <a 
                href="/"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-white border border-slate-200 rounded-full px-6 py-3 font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            >
                <Home size={18} />
                Go Home
            </a>
            </div>
          </div>
        </main>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
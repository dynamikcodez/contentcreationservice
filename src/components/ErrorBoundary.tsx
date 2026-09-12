'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw, Home, Trash2 } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('CCS Ultra Uncaught Error caught by boundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleResetStorage = () => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('ccs-ultra-storage');
        window.localStorage.removeItem('ccs-ultra-v5-store');
        window.localStorage.clear();
      }
    } catch (e) {
      console.warn('Could not clear localStorage:', e);
    }
    window.location.href = '/';
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-red-500/30 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-extrabold text-base text-slate-100">Application Error Encountered</h1>
                <p className="text-xs text-slate-400">CCS Ultra caught an unexpected rendering issue</p>
              </div>
            </div>

            {this.state.error && (
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs font-mono text-red-300 overflow-x-auto max-h-40">
                {this.state.error.toString()}
              </div>
            )}

            <p className="text-xs text-slate-400 leading-relaxed">
              This is usually caused by outdated cached state in your browser from an earlier version.
              Clicking below will clear the local cache and restore all 20 days and strategy data.
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <button
                type="button"
                onClick={this.handleResetStorage}
                className="flex-1 py-3 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Reset Cache & Restore</span>
              </button>
              <button
                type="button"
                onClick={this.handleReload}
                className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Page</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

import React from 'react'
import type { FitCoreWorkout, FitCoreCategory } from '../types'

export interface FitCoreFooterProps {
  onNavigateHome: () => void
  onNavigateCollection: (workout?: FitCoreWorkout, category?: FitCoreCategory) => void
}

export const FitCoreFooter: React.FC<FitCoreFooterProps> = ({
  onNavigateHome,
  onNavigateCollection,
}) => {
  return (
    <footer className="fitcore-footer">
      <div className="fitcore-container">
        <div className="fitcore-footer-grid">
          {/* Brand Philosophy */}
          <div className="fitcore-footer-brand">
            <div className="fitcore-brand-group" onClick={onNavigateHome}>
              <div className="fitcore-logo-mark">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff">
                  <path d="M6 3h12l-3 18H3L6 3z" />
                </svg>
              </div>
              <div className="fitcore-logo-text">
                FIT<span>CORE</span>
              </div>
            </div>

            <p>
              BUILD YOUR STRONGEST SELF. Engineering athlete activewear and competition-grade gear
              built for unrelenting physical progress.
            </p>

            <div style={{ color: '#cbd5e1', fontSize: '0.8rem', fontWeight: 600 }}>
              Operating across India · Currency: <strong>INR (₹)</strong>
            </div>
          </div>

          {/* Shop Disciplines */}
          <div className="fitcore-footer-col">
            <h4>Workouts</h4>
            <ul>
              <li>
                <a onClick={() => onNavigateCollection('strength')}>Strength & Power</a>
              </li>
              <li>
                <a onClick={() => onNavigateCollection('running')}>Road & Trail Running</a>
              </li>
              <li>
                <a onClick={() => onNavigateCollection('hiit')}>High-Intensity HIIT</a>
              </li>
              <li>
                <a onClick={() => onNavigateCollection('yoga')}>Mobility & Yoga</a>
              </li>
              <li>
                <a onClick={() => onNavigateCollection('training')}>Hybrid Training</a>
              </li>
              <li>
                <a onClick={() => onNavigateCollection('recovery')}>Percussive Recovery</a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="fitcore-footer-col">
            <h4>Categories</h4>
            <ul>
              <li>
                <a onClick={() => onNavigateCollection(undefined, 'gym-wear')}>Gym Wear & Tops</a>
              </li>
              <li>
                <a onClick={() => onNavigateCollection(undefined, 'apparel')}>Performance Bottoms</a>
              </li>
              <li>
                <a onClick={() => onNavigateCollection(undefined, 'footwear')}>Training Footwear</a>
              </li>
              <li>
                <a onClick={() => onNavigateCollection(undefined, 'equipment')}>Barbells & Bells</a>
              </li>
              <li>
                <a onClick={() => onNavigateCollection(undefined, 'accessories')}>Belts & Wraps</a>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="fitcore-footer-col">
            <h4>Support</h4>
            <ul>
              <li>
                <a onClick={() => alert('FitCore Track Order: Fast dispatch within 24 hours.')}>Track Order</a>
              </li>
              <li>
                <a onClick={() => alert('FitCore Shipping: Free delivery across India on orders above ₹999.')}>Shipping & Delivery</a>
              </li>
              <li>
                <a onClick={() => alert('FitCore Returns: 30-day hassle-free athlete exchange guarantee.')}>30-Day Returns</a>
              </li>
              <li>
                <a onClick={() => alert('FitCore Size Guide: Measured on athletic builds for true-to-fit sizing.')}>Size Guide</a>
              </li>
              <li>
                <a onClick={() => alert('FitCore Warranty: Lifetime stitching & seam warranty on activewear.')}>Lifetime Warranty</a>
              </li>
            </ul>
          </div>

          {/* Community & Brand */}
          <div className="fitcore-footer-col">
            <h4>Community</h4>
            <ul>
              <li>
                <a onClick={() => alert('FitCore Athlete Program: Apply to represent the brand.')}>Athlete Ambassador</a>
              </li>
              <li>
                <a onClick={() => alert('FitCore Gym Affiliates: Wholesale gym partner program.')}>Gym Affiliates</a>
              </li>
              <li>
                <a onClick={() => alert('FitCore App: Free workout tracking & community logs.')}>FitCore App</a>
              </li>
              <li>
                <a onClick={() => alert('FitCore Sustainability: 85% recycled nylon and zero microplastic packaging.')}>Sustainability</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="fitcore-footer-bottom">
          <div>© {new Date().getFullYear()} FitCore Athletic Gear Co. All rights reserved. Willovate Storefront.</div>
          <div style={{ display: 'flex', gap: 16 }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

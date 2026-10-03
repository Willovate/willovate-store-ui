import React, { useState } from 'react'

interface VelocitySizeGuideModalProps {
  isOpen: boolean
  onClose: () => void
}

export const VelocitySizeGuideModal: React.FC<VelocitySizeGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'men' | 'women' | 'shoes'>('men')
  const [unit, setUnit] = useState<'cm' | 'inches'>('inches')

  if (!isOpen) return null

  return (
    <div className="velocity-modal-backdrop" onClick={onClose}>
      <div
        className="velocity-size-guide-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Velocity Sizing Guide"
      >
        <div className="size-guide-header">
          <div className="size-guide-title-group">
            <span className="kicker">VELOCITY ANATOMICAL LAB</span>
            <h3>PRECISION SIZING CHARTS</h3>
          </div>

          <div className="header-controls">
            {/* Unit Toggle */}
            <div className="unit-toggle-pill">
              <button
                type="button"
                className={`unit-btn ${unit === 'inches' ? 'is-active' : ''}`}
                onClick={() => setUnit('inches')}
              >
                Inches
              </button>
              <button
                type="button"
                className={`unit-btn ${unit === 'cm' ? 'is-active' : ''}`}
                onClick={() => setUnit('cm')}
              >
                CM
              </button>
            </div>

            <button
              type="button"
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Close size guide"
            >
              ×
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="size-guide-tabs">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'men' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('men')}
          >
            Men’s Apparel
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'women' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('women')}
          >
            Women’s Apparel
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'shoes' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('shoes')}
          >
            Footwear (Men & Women)
          </button>
        </div>

        <div className="size-guide-body">
          {activeTab === 'men' && (
            <div className="table-responsive">
              <table className="size-table">
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Chest ({unit})</th>
                    <th>Waist ({unit})</th>
                    <th>Hips ({unit})</th>
                    <th>Inseam ({unit})</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>S</strong></td>
                    <td>{unit === 'inches' ? '35 – 38' : '88 – 96'}</td>
                    <td>{unit === 'inches' ? '29 – 31' : '73 – 81'}</td>
                    <td>{unit === 'inches' ? '35 – 37' : '88 – 96'}</td>
                    <td>{unit === 'inches' ? '31.5' : '80'}</td>
                  </tr>
                  <tr>
                    <td><strong>M</strong></td>
                    <td>{unit === 'inches' ? '38 – 41' : '96 – 104'}</td>
                    <td>{unit === 'inches' ? '31 – 34' : '81 – 89'}</td>
                    <td>{unit === 'inches' ? '38 – 40' : '96 – 104'}</td>
                    <td>{unit === 'inches' ? '32.0' : '81'}</td>
                  </tr>
                  <tr>
                    <td><strong>L</strong></td>
                    <td>{unit === 'inches' ? '41 – 44' : '104 – 112'}</td>
                    <td>{unit === 'inches' ? '34 – 38' : '89 – 97'}</td>
                    <td>{unit === 'inches' ? '41 – 43' : '104 – 112'}</td>
                    <td>{unit === 'inches' ? '32.5' : '82.5'}</td>
                  </tr>
                  <tr>
                    <td><strong>XL</strong></td>
                    <td>{unit === 'inches' ? '44 – 48' : '112 – 124'}</td>
                    <td>{unit === 'inches' ? '38 – 43' : '97 – 109'}</td>
                    <td>{unit === 'inches' ? '44 – 47' : '112 – 120'}</td>
                    <td>{unit === 'inches' ? '33.0' : '83'}</td>
                  </tr>
                  <tr>
                    <td><strong>XXL</strong></td>
                    <td>{unit === 'inches' ? '48 – 53' : '124 – 136'}</td>
                    <td>{unit === 'inches' ? '43 – 47' : '109 – 121'}</td>
                    <td>{unit === 'inches' ? '47 – 50' : '120 – 128'}</td>
                    <td>{unit === 'inches' ? '33.5' : '84'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'women' && (
            <div className="table-responsive">
              <table className="size-table">
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Bust ({unit})</th>
                    <th>Waist ({unit})</th>
                    <th>Hips ({unit})</th>
                    <th>Standard Bra Match</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>XS</strong></td>
                    <td>{unit === 'inches' ? '30 – 32' : '76 – 82'}</td>
                    <td>{unit === 'inches' ? '24 – 26' : '60 – 66'}</td>
                    <td>{unit === 'inches' ? '33 – 35' : '84 – 90'}</td>
                    <td>30A, 30B, 32AA, 32A</td>
                  </tr>
                  <tr>
                    <td><strong>S</strong></td>
                    <td>{unit === 'inches' ? '33 – 35' : '83 – 89'}</td>
                    <td>{unit === 'inches' ? '26 – 28' : '67 – 73'}</td>
                    <td>{unit === 'inches' ? '36 – 38' : '91 – 97'}</td>
                    <td>32B, 32C, 34A, 34B</td>
                  </tr>
                  <tr>
                    <td><strong>M</strong></td>
                    <td>{unit === 'inches' ? '36 – 38' : '90 – 97'}</td>
                    <td>{unit === 'inches' ? '29 – 31' : '74 – 80'}</td>
                    <td>{unit === 'inches' ? '39 – 41' : '98 – 105'}</td>
                    <td>34C, 34D, 36A, 36B</td>
                  </tr>
                  <tr>
                    <td><strong>L</strong></td>
                    <td>{unit === 'inches' ? '39 – 42' : '98 – 107'}</td>
                    <td>{unit === 'inches' ? '32 – 35' : '81 – 90'}</td>
                    <td>{unit === 'inches' ? '42 – 45' : '106 – 114'}</td>
                    <td>36C, 36D, 38B, 38C</td>
                  </tr>
                  <tr>
                    <td><strong>XL</strong></td>
                    <td>{unit === 'inches' ? '43 – 46' : '108 – 118'}</td>
                    <td>{unit === 'inches' ? '36 – 39' : '91 – 100'}</td>
                    <td>{unit === 'inches' ? '46 – 49' : '115 – 124'}</td>
                    <td>38D, 38DD, 40C, 40D</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'shoes' && (
            <div className="table-responsive">
              <table className="size-table">
                <thead>
                  <tr>
                    <th>US Men</th>
                    <th>US Women</th>
                    <th>UK</th>
                    <th>EU</th>
                    <th>Heel-to-Toe ({unit})</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>7.0</td>
                    <td>8.5</td>
                    <td>6.5</td>
                    <td>40</td>
                    <td>{unit === 'inches' ? '9.8' : '25.0 cm'}</td>
                  </tr>
                  <tr>
                    <td>8.0</td>
                    <td>9.5</td>
                    <td>7.5</td>
                    <td>41.5</td>
                    <td>{unit === 'inches' ? '10.2' : '26.0 cm'}</td>
                  </tr>
                  <tr>
                    <td>9.0</td>
                    <td>10.5</td>
                    <td>8.5</td>
                    <td>42.5</td>
                    <td>{unit === 'inches' ? '10.6' : '27.0 cm'}</td>
                  </tr>
                  <tr>
                    <td>10.0</td>
                    <td>11.5</td>
                    <td>9.5</td>
                    <td>44</td>
                    <td>{unit === 'inches' ? '11.0' : '28.0 cm'}</td>
                  </tr>
                  <tr>
                    <td>11.0</td>
                    <td>12.5</td>
                    <td>10.5</td>
                    <td>45</td>
                    <td>{unit === 'inches' ? '11.4' : '29.0 cm'}</td>
                  </tr>
                  <tr>
                    <td>12.0</td>
                    <td>13.5</td>
                    <td>11.5</td>
                    <td>46.5</td>
                    <td>{unit === 'inches' ? '11.8' : '30.0 cm'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Sizing Tips */}
          <div className="sizing-tips-strip">
            <span className="tip-icon">💡</span>
            <p>
              <strong>VELOCITY FIT RECOMMENDATION:</strong> Our racing shoes fit true to competitive size with a snug race-lockdown midfoot. If you are between sizes or prefer a relaxed training fit, we recommend going a half-size up.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


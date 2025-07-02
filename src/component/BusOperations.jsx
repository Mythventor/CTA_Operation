import React, { useState } from 'react';
import { AlertTriangle, Bus, Calendar, DollarSign, Wrench, TrendingDown, TrendingUp, Clock, CheckCircle } from 'lucide-react';

const BusOperations = ({ onNavigate }) => {
  const [selectedBus, setSelectedBus] = useState(null);
  const [view, setView] = useState('overview'); // overview, individual, breakeven

  // Mock bus fleet data with AI predictions
  const busFleet = [
    {
      id: 'BUS-4521',
      route: '22 Clark',
      model: 'New Flyer XD40',
      year: 2018,
      mileage: 245678,
      status: 'operational',
      location: 'Chicago Garage',
      lastMaintenance: '2024-06-15',
      nextPredictedMaintenance: [
        { type: 'Oil Change', dueDate: '2024-07-05', dueMileage: 248000, cost: 85, confidence: 94 },
        { type: 'Transmission Fluid', dueDate: '2024-08-12', dueMileage: 252000, cost: 150, confidence: 87 },
        { type: 'Brake Inspection', dueDate: '2024-07-18', dueMileage: 250000, cost: 320, confidence: 92 },
        { type: 'Engine Tune-up', dueDate: '2024-09-15', dueMileage: 258000, cost: 650, confidence: 89 }
      ],
      lifespan: {
        totalLifeExpectancy: 500000,
        remainingLife: 254322,
        monthlyMaintenanceCost: 485,
        projectedAnnualCost: 5820,
        replacementCost: 450000,
        breakEvenPoint: {
          mileage: 425000,
          date: '2026-03-15',
          monthsRemaining: 20,
          isApproaching: false
        }
      },
      healthScore: 85,
      fuelEfficiency: 7.2
    },
    {
      id: 'BUS-7829',
      route: '36 Broadway',
      model: 'Proterra ZX5',
      year: 2015,
      mileage: 387452,
      status: 'maintenance_due',
      location: 'North Park Garage',
      lastMaintenance: '2024-06-20',
      nextPredictedMaintenance: [
        { type: 'Battery System Check', dueDate: '2024-07-03', dueMileage: 388000, cost: 1200, confidence: 96 },
        { type: 'Motor Inspection', dueDate: '2024-07-10', dueMileage: 390000, cost: 800, confidence: 91 },
        { type: 'Cooling System Service', dueDate: '2024-07-25', dueMileage: 393000, cost: 450, confidence: 88 },
        { type: 'Charging Port Maintenance', dueDate: '2024-08-05', dueMileage: 395000, cost: 320, confidence: 85 }
      ],
      lifespan: {
        totalLifeExpectancy: 450000,
        remainingLife: 62548,
        monthlyMaintenanceCost: 892,
        projectedAnnualCost: 10704,
        replacementCost: 520000,
        breakEvenPoint: {
          mileage: 420000,
          date: '2024-11-20',
          monthsRemaining: 4,
          isApproaching: true
        }
      },
      healthScore: 67,
      fuelEfficiency: 0 // Electric
    },
    {
      id: 'BUS-3401',
      route: '147 Outer DuSable',
      model: 'Nova LFS',
      year: 2012,
      mileage: 445623,
      status: 'critical',
      location: 'Forest Glen Garage',
      lastMaintenance: '2024-06-28',
      nextPredictedMaintenance: [
        { type: 'Engine Overhaul', dueDate: '2024-07-02', dueMileage: 446000, cost: 8500, confidence: 98 },
        { type: 'Transmission Rebuild', dueDate: '2024-07-15', dueMileage: 448000, cost: 12000, confidence: 94 },
        { type: 'Suspension Replacement', dueDate: '2024-08-01', dueMileage: 450000, cost: 3200, confidence: 89 }
      ],
      lifespan: {
        totalLifeExpectancy: 500000,
        remainingLife: 54377,
        monthlyMaintenanceCost: 1850,
        projectedAnnualCost: 22200,
        replacementCost: 420000,
        breakEvenPoint: {
          mileage: 455000,
          date: '2024-08-15',
          monthsRemaining: 1.5,
          isApproaching: true
        }
      },
      healthScore: 42,
      fuelEfficiency: 5.8
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'operational': return 'text-green-600 bg-green-100';
      case 'maintenance_due': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getHealthScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const BreakEvenAnalysis = ({ bus }) => {
    const monthsToBreakEven = Math.ceil((new Date(bus.lifespan.breakEvenPoint.date) - new Date()) / (1000 * 60 * 60 * 24 * 30));
    const totalMaintenanceCostToBreakEven = monthsToBreakEven * bus.lifespan.monthlyMaintenanceCost;
    
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Break-Even Analysis - {bus.id}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900">Current Status</h4>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-blue-700">Current Mileage:</span>
                  <span className="text-sm font-medium">{bus.mileage.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-blue-700">Monthly Maintenance Cost:</span>
                  <span className="text-sm font-medium">{formatCurrency(bus.lifespan.monthlyMaintenanceCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-blue-700">Annual Maintenance Cost:</span>
                  <span className="text-sm font-medium">{formatCurrency(bus.lifespan.projectedAnnualCost)}</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-900">Break-Even Point</h4>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-yellow-700">Break-Even Mileage:</span>
                  <span className="text-sm font-medium">{bus.lifespan.breakEvenPoint.mileage.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-yellow-700">Break-Even Date:</span>
                  <span className="text-sm font-medium">{bus.lifespan.breakEvenPoint.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-yellow-700">Months Remaining:</span>
                  <span className="text-sm font-medium">{monthsToBreakEven}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-medium text-red-900">Replacement Analysis</h4>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-red-700">New Bus Cost:</span>
                  <span className="text-sm font-medium">{formatCurrency(bus.lifespan.replacementCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-red-700">Maintenance to Break-Even:</span>
                  <span className="text-sm font-medium">{formatCurrency(totalMaintenanceCostToBreakEven)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-red-700">Cost Difference:</span>
                  <span className="text-sm font-medium">{formatCurrency(bus.lifespan.replacementCost - totalMaintenanceCostToBreakEven)}</span>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-lg ${bus.lifespan.breakEvenPoint.isApproaching ? 'bg-red-100' : 'bg-green-100'}`}>
              <h4 className={`font-medium ${bus.lifespan.breakEvenPoint.isApproaching ? 'text-red-900' : 'text-green-900'}`}>
                Recommendation
              </h4>
              <p className={`text-sm mt-2 ${bus.lifespan.breakEvenPoint.isApproaching ? 'text-red-700' : 'text-green-700'}`}>
                {bus.lifespan.breakEvenPoint.isApproaching 
                  ? `⚠️ Consider replacement soon. Break-even point is approaching in ${monthsToBreakEven} months. Continuing maintenance may cost more than replacement.`
                  : `✅ Continue maintenance schedule. Break-even point is ${monthsToBreakEven} months away. Current maintenance is cost-effective.`
                }
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-3">Cost Projection Chart</h4>
          <div className="h-32 bg-white rounded border flex items-center justify-center">
            <span className="text-gray-500">Chart visualization would show maintenance costs vs replacement cost over time</span>
          </div>
        </div>
      </div>
    );
  };

  const BusDetail = ({ bus }) => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">{bus.id} - {bus.route}</h2>
        <div className="flex space-x-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(bus.status)}`}>
            {bus.status.replace('_', ' ').toUpperCase()}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getHealthScoreColor(bus.healthScore)} bg-gray-100`}>
            Health: {bus.healthScore}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Information</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Model:</span>
              <span className="text-sm font-medium">{bus.model}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Year:</span>
              <span className="text-sm font-medium">{bus.year}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Mileage:</span>
              <span className="text-sm font-medium">{bus.mileage.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Location:</span>
              <span className="text-sm font-medium">{bus.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Fuel Efficiency:</span>
              <span className="text-sm font-medium">{bus.fuelEfficiency > 0 ? `${bus.fuelEfficiency} MPG` : 'Electric'}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Lifespan Analysis</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Life Expectancy:</span>
              <span className="text-sm font-medium">{bus.lifespan.totalLifeExpectancy.toLocaleString()} mi</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Remaining Life:</span>
              <span className="text-sm font-medium">{bus.lifespan.remainingLife.toLocaleString()} mi</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${(bus.mileage / bus.lifespan.totalLifeExpectancy) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Monthly Cost:</span>
              <span className="text-sm font-medium">{formatCurrency(bus.lifespan.monthlyMaintenanceCost)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Health Assessment</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Overall Health:</span>
              <span className={`text-sm font-medium ${getHealthScoreColor(bus.healthScore)}`}>{bus.healthScore}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Last Maintenance:</span>
              <span className="text-sm font-medium">{bus.lastMaintenance}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Prediction Accuracy:</span>
              <span className="text-sm font-medium">92%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">AI Maintenance Predictions</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {bus.nextPredictedMaintenance.map((maintenance, index) => (
            <div key={index} className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Wrench className="h-5 w-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{maintenance.type}</p>
                  <p className="text-sm text-gray-500">
                    Due: {maintenance.dueDate} | {maintenance.dueMileage.toLocaleString()} miles
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{formatCurrency(maintenance.cost)}</p>
                <p className="text-sm text-gray-500">Confidence: {maintenance.confidence}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Bus Operations</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => setView('overview')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              view === 'overview' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Fleet Overview
          </button>
          <button
            onClick={() => setView('breakeven')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              view === 'breakeven' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Break-Even Analysis
          </button>
        </div>
      </div>

      {view === 'overview' && !selectedBus && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Bus Fleet Status</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {busFleet.map((bus) => (
              <div key={bus.id} className="px-6 py-4 hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedBus(bus)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Bus className="h-6 w-6 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{bus.id} - {bus.route}</p>
                      <p className="text-sm text-gray-500">{bus.model} ({bus.year}) | {bus.mileage.toLocaleString()} miles</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bus.status)}`}>
                      {bus.status.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className={`text-sm font-medium ${getHealthScoreColor(bus.healthScore)}`}>
                      {bus.healthScore}%
                    </span>
                    <span className="text-sm text-gray-900">{formatCurrency(bus.lifespan.monthlyMaintenanceCost)}/mo</span>
                    {bus.lifespan.breakEvenPoint.isApproaching && (
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'overview' && selectedBus && (
        <div>
          <button
            onClick={() => setSelectedBus(null)}
            className="mb-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            ← Back to Fleet Overview
          </button>
          <BusDetail bus={selectedBus} />
        </div>
      )}

      {view === 'breakeven' && (
        <div className="space-y-6">
          {busFleet.map((bus) => (
            <BreakEvenAnalysis key={bus.id} bus={bus} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BusOperations;
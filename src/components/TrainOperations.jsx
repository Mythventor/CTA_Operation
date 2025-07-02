import React, { useState } from 'react';
import { AlertTriangle, Train, Calendar, DollarSign, Wrench, Battery, Zap, Settings } from 'lucide-react';

const TrainOperations = ({ onNavigate }) => {
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [view, setView] = useState('overview'); // overview, individual, performance

  // Mock train fleet data with AI predictions
  const trainFleet = [
    {
      id: 'TRAIN-302',
      line: 'Blue Line',
      model: '5000 Series',
      year: 2009,
      mileage: 892456,
      status: 'operational',
      location: 'Forest Park Yard',
      lastMaintenance: '2024-06-10',
      carCount: 8,
      nextPredictedMaintenance: [
        { type: 'Brake System Inspection', dueDate: '2024-07-03', dueMileage: 895000, cost: 1200, confidence: 95 },
        { type: 'Traction Motor Service', dueDate: '2024-07-15', dueMileage: 897000, cost: 3500, confidence: 91 },
        { type: 'HVAC System Maintenance', dueDate: '2024-07-28', dueMileage: 900000, cost: 850, confidence: 88 },
        { type: 'Door Mechanism Check', dueDate: '2024-08-05', dueMileage: 902000, cost: 650, confidence: 92 }
      ],
      lifespan: {
        totalLifeExpectancy: 1200000,
        remainingLife: 307544,
        monthlyMaintenanceCost: 2850,
        projectedAnnualCost: 34200,
        replacementCost: 3200000,
        breakEvenPoint: {
          mileage: 1100000,
          date: '2026-08-20',
          monthsRemaining: 25,
          isApproaching: false
        }
      },
      healthScore: 78,
      performance: {
        onTimePerformance: 94.2,
        averageSpeed: 24.5,
        energyEfficiency: 85.3,
        passengerCapacity: 1200
      },
      systems: {
        propulsion: 82,
        braking: 89,
        doors: 91,
        hvac: 76,
        communication: 95,
        safety: 88
      }
    },
    {
      id: 'TRAIN-118',
      line: 'Red Line',
      model: '2600 Series',
      year: 2002,
      mileage: 1145782,
      status: 'maintenance_due',
      location: '98th Street Yard',
      lastMaintenance: '2024-06-22',
      carCount: 8,
      nextPredictedMaintenance: [
        { type: 'Motor Overhaul', dueDate: '2024-07-02', dueMileage: 1146000, cost: 8500, confidence: 97 },
        { type: 'Electrical System Upgrade', dueDate: '2024-07-12', dueMileage: 1148000, cost: 4200, confidence: 89 },
        { type: 'Suspension Replacement', dueDate: '2024-07-25', dueMileage: 1150000, cost: 2800, confidence: 86 },
        { type: 'Control System Calibration', dueDate: '2024-08-08', dueMileage: 1152000, cost: 1500, confidence: 93 }
      ],
      lifespan: {
        totalLifeExpectancy: 1200000,
        remainingLife: 54218,
        monthlyMaintenanceCost: 4200,
        projectedAnnualCost: 50400,
        replacementCost: 3200000,
        breakEvenPoint: {
          mileage: 1180000,
          date: '2024-10-15',
          monthsRemaining: 3,
          isApproaching: true
        }
      },
      healthScore: 62,
      performance: {
        onTimePerformance: 87.8,
        averageSpeed: 22.1,
        energyEfficiency: 78.9,
        passengerCapacity: 1100
      },
      systems: {
        propulsion: 65,
        braking: 72,
        doors: 68,
        hvac: 59,
        communication: 81,
        safety: 75
      }
    },
    {
      id: 'TRAIN-445',
      line: 'Green Line',
      model: '5000 Series',
      year: 2011,
      mileage: 756234,
      status: 'operational',
      location: 'Harlem Yard',
      lastMaintenance: '2024-06-25',
      carCount: 6,
      nextPredictedMaintenance: [
        { type: 'Scheduled Inspection', dueDate: '2024-07-08', dueMileage: 758000, cost: 950, confidence: 96 },
        { type: 'Brake Pad Replacement', dueDate: '2024-07-20', dueMileage: 760000, cost: 1800, confidence: 90 },
        { type: 'Signal System Update', dueDate: '2024-08-12', dueMileage: 765000, cost: 2200, confidence: 87 },
        { type: 'Interior Refurbishment', dueDate: '2024-09-15', dueMileage: 770000, cost: 5500, confidence: 84 }
      ],
      lifespan: {
        totalLifeExpectancy: 1200000,
        remainingLife: 443766,
        monthlyMaintenanceCost: 1950,
        projectedAnnualCost: 23400,
        replacementCost: 3200000,
        breakEvenPoint: {
          mileage: 1050000,
          date: '2028-01-10',
          monthsRemaining: 42,
          isApproaching: false
        }
      },
      healthScore: 89,
      performance: {
        onTimePerformance: 96.1,
        averageSpeed: 25.8,
        energyEfficiency: 89.7,
        passengerCapacity: 900
      },
      systems: {
        propulsion: 91,
        braking: 87,
        doors: 93,
        hvac: 85,
        communication: 92,
        safety: 94
      }
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

  const getSystemHealthColor = (score) => {
    if (score >= 85) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const SystemHealthIndicator = ({ systems }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health Status</h3>
      <div className="space-y-3">
        {Object.entries(systems).map(([system, health]) => (
          <div key={system} className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 capitalize">{system}:</span>
            <div className="flex items-center space-x-2">
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${getSystemHealthColor(health)}`}
                  style={{ width: `${health}%` }}
                ></div>
              </div>
              <span className={`text-sm font-medium ${getHealthScoreColor(health)}`}>
                {health}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const TrainDetail = ({ train }) => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">{train.id} - {train.line}</h2>
        <div className="flex space-x-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(train.status)}`}>
            {train.status.replace('_', ' ').toUpperCase()}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getHealthScoreColor(train.healthScore)} bg-gray-100`}>
            Health: {train.healthScore}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Train Information</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Model:</span>
              <span className="text-sm font-medium">{train.model}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Year:</span>
              <span className="text-sm font-medium">{train.year}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Mileage:</span>
              <span className="text-sm font-medium">{train.mileage.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Car Count:</span>
              <span className="text-sm font-medium">{train.carCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Capacity:</span>
              <span className="text-sm font-medium">{train.performance.passengerCapacity}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">On-Time Performance:</span>
              <span className="text-sm font-medium">{train.performance.onTimePerformance}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Average Speed:</span>
              <span className="text-sm font-medium">{train.performance.averageSpeed} mph</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Energy Efficiency:</span>
              <span className="text-sm font-medium">{train.performance.energyEfficiency}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Last Maintenance:</span>
              <span className="text-sm font-medium">{train.lastMaintenance}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Lifespan Analysis</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Life Expectancy:</span>
              <span className="text-sm font-medium">{train.lifespan.totalLifeExpectancy.toLocaleString()} mi</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Remaining Life:</span>
              <span className="text-sm font-medium">{train.lifespan.remainingLife.toLocaleString()} mi</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-green-600 h-2 rounded-full" 
                style={{ width: `${(train.mileage / train.lifespan.totalLifeExpectancy) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Monthly Cost:</span>
              <span className="text-sm font-medium">{formatCurrency(train.lifespan.monthlyMaintenanceCost)}</span>
            </div>
          </div>
        </div>

        <SystemHealthIndicator systems={train.systems} />
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">AI Maintenance Predictions</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {train.nextPredictedMaintenance.map((maintenance, index) => (
            <div key={index} className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {maintenance.type.includes('Motor') || maintenance.type.includes('Electrical') ? 
                    <Zap className="h-5 w-5 text-yellow-500" /> :
                    maintenance.type.includes('Brake') ? 
                    <Settings className="h-5 w-5 text-red-500" /> :
                    <Wrench className="h-5 w-5 text-gray-400" />
                  }
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

      {train.lifespan.breakEvenPoint.isApproaching && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
            <h4 className="text-sm font-medium text-red-800">Break-Even Alert</h4>
          </div>
          <p className="text-sm text-red-700 mt-1">
            This train is approaching its break-even point in {train.lifespan.breakEvenPoint.monthsRemaining} months. 
            Consider planning for replacement to avoid excessive maintenance costs.
          </p>
        </div>
      )}
    </div>
  );

  const PerformanceOverview = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Fleet Performance Analysis</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Average Performance Metrics</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Fleet On-Time Performance:</span>
              <span className="text-sm font-medium">92.7%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Average Speed:</span>
              <span className="text-sm font-medium">24.1 mph</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Energy Efficiency:</span>
              <span className="text-sm font-medium">84.6%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Overall Health Score:</span>
              <span className="text-sm font-medium">76.3%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Maintenance Costs</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Monthly Total:</span>
              <span className="text-sm font-medium">{formatCurrency(9000)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Per Train Average:</span>
              <span className="text-sm font-medium">{formatCurrency(3000)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Projected Annual:</span>
              <span className="text-sm font-medium">{formatCurrency(108000)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Cost per Mile:</span>
              <span className="text-sm font-medium">$0.12</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Fleet Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Trains:</span>
              <span className="text-sm font-medium">{trainFleet.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Operational:</span>
              <span className="text-sm font-medium text-green-600">
                {trainFleet.filter(t => t.status === 'operational').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Maintenance Due:</span>
              <span className="text-sm font-medium text-yellow-600">
                {trainFleet.filter(t => t.status === 'maintenance_due').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Break-Even Approaching:</span>
              <span className="text-sm font-medium text-red-600">
                {trainFleet.filter(t => t.lifespan.breakEvenPoint.isApproaching).length}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">System Health Overview</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['propulsion', 'braking', 'doors', 'hvac', 'communication', 'safety'].map((system) => {
              const avgHealth = Math.round(
                trainFleet.reduce((sum, train) => sum + train.systems[system], 0) / trainFleet.length
              );
              return (
                <div key={system} className="text-center">
                  <div className="mb-2">
                    <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
                      <div 
                        className={`w-12 h-12 rounded-full ${getSystemHealthColor(avgHealth)} opacity-80`}
                      ></div>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-900 capitalize">{system}</p>
                  <p className={`text-sm ${getHealthScoreColor(avgHealth)}`}>{avgHealth}%</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Train Operations</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => setView('overview')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              view === 'overview' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Fleet Overview
          </button>
          <button
            onClick={() => setView('performance')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              view === 'performance' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Performance Analysis
          </button>
        </div>
      </div>

      {view === 'overview' && !selectedTrain && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Train Fleet Status</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {trainFleet.map((train) => (
              <div key={train.id} className="px-6 py-4 hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedTrain(train)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Train className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{train.id} - {train.line}</p>
                      <p className="text-sm text-gray-500">
                        {train.model} ({train.year}) | {train.mileage.toLocaleString()} miles | {train.carCount} cars
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(train.status)}`}>
                      {train.status.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className={`text-sm font-medium ${getHealthScoreColor(train.healthScore)}`}>
                      {train.healthScore}%
                    </span>
                    <span className="text-sm text-gray-900">
                      {formatCurrency(train.lifespan.monthlyMaintenanceCost)}/mo
                    </span>
                    {train.lifespan.breakEvenPoint.isApproaching && (
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'overview' && selectedTrain && (
        <div>
          <button
            onClick={() => setSelectedTrain(null)}
            className="mb-4 text-green-600 hover:text-green-800 text-sm font-medium"
          >
            ← Back to Fleet Overview
          </button>
          <TrainDetail train={selectedTrain} />
        </div>
      )}

      {view === 'performance' && <PerformanceOverview />}
    </div>
  );
};

export default TrainOperations;
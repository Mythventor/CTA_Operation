import React, { useState } from 'react';
import { AlertTriangle, MapPin, Calendar, DollarSign, Wrench, Navigation, Signal, Construction } from 'lucide-react';

const TrackOperations = ({ onNavigate }) => {
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [view, setView] = useState('overview'); // overview, individual, critical

  // Mock track data with AI predictions
  const trackSegments = [
    {
      id: 'TRACK-RL-N15',
      line: 'Red Line',
      segment: 'Howard to Loyola',
      startStation: 'Howard',
      endStation: 'Loyola',
      mileage: 3.2,
      yearInstalled: 2018,
      lastMaintenance: '2024-05-20',
      condition: 'good',
      priority: 'low',
      nextPredictedMaintenance: [
        { type: 'Track Inspection', dueDate: '2024-07-15', cost: 1200, confidence: 96 },
        { type: 'Rail Grinding', dueDate: '2024-09-10', cost: 8500, confidence: 89 },
        { type: 'Ballast Cleaning', dueDate: '2024-10-05', cost: 15000, confidence: 87 },
        { type: 'Signal Maintenance', dueDate: '2024-08-20', cost: 3200, confidence: 92 }
      ],
      lifespan: {
        expectedLifespan: 30,
        remainingYears: 24,
        monthlyMaintenanceCost: 2100,
        projectedAnnualCost: 25200,
        replacementCost: 850000,
        condition: 92
      },
      weatherImpact: 'low',
      trafficLevel: 'high',
      avgTrainsPerDay: 340
    },
    {
      id: 'TRACK-BL-W08',
      line: 'Blue Line',
      segment: 'Division to Grand',
      startStation: 'Division',
      endStation: 'Grand',
      mileage: 1.8,
      yearInstalled: 2008,
      lastMaintenance: '2024-06-10',
      condition: 'fair',
      priority: 'medium',
      nextPredictedMaintenance: [
        { type: 'Rail Replacement', dueDate: '2024-07-08', cost: 45000, confidence: 94 },
        { type: 'Switch Mechanism Repair', dueDate: '2024-07-20', cost: 12000, confidence: 91 },
        { type: 'Platform Resurfacing', dueDate: '2024-08-15', cost: 25000, confidence: 88 },
        { type: 'Drainage System Update', dueDate: '2024-09-01', cost: 18000, confidence: 85 }
      ],
      lifespan: {
        expectedLifespan: 30,
        remainingYears: 14,
        monthlyMaintenanceCost: 4200,
        projectedAnnualCost: 50400,
        replacementCost: 950000,
        condition: 68
      },
      weatherImpact: 'medium',
      trafficLevel: 'medium',
      avgTrainsPerDay: 210
    },
    {
      id: 'TRACK-ML-15',
      line: 'Green Line',
      segment: 'Central to Laramie',
      startStation: 'Central',
      endStation: 'Laramie',
      mileage: 2.5,
      yearInstalled: 2001,
      lastMaintenance: '2024-06-25',
      condition: 'poor',
      priority: 'critical',
      nextPredictedMaintenance: [
        { type: 'Emergency Rail Replacement', dueDate: '2024-07-03', cost: 65000, confidence: 98 },
        { type: 'Complete Track Renewal', dueDate: '2024-07-15', cost: 180000, confidence: 96 },
        { type: 'Signal System Overhaul', dueDate: '2024-07-25', cost: 85000, confidence: 93 },
        { type: 'Station Infrastructure Repair', dueDate: '2024-08-10', cost: 120000, confidence: 90 }
      ],
      lifespan: {
        expectedLifespan: 30,
        remainingYears: 7,
        monthlyMaintenanceCost: 8500,
        projectedAnnualCost: 102000,
        replacementCost: 1200000,
        condition: 38
      },
      weatherImpact: 'high',
      trafficLevel: 'medium',
      avgTrainsPerDay: 180
    },
    {
      id: 'TRACK-OR-S12',
      line: 'Orange Line',
      segment: 'Roosevelt to LaSalle',
      startStation: 'Roosevelt',
      endStation: 'LaSalle',
      mileage: 1.2,
      yearInstalled: 2015,
      lastMaintenance: '2024-06-18',
      condition: 'excellent',
      priority: 'low',
      nextPredictedMaintenance: [
        { type: 'Routine Inspection', dueDate: '2024-08-05', cost: 800, confidence: 95 },
        { type: 'Minor Signal Adjustment', dueDate: '2024-09-12', cost: 1500, confidence: 88 },
        { type: 'Platform Cleaning', dueDate: '2024-07-20', cost: 2200, confidence: 91 },
        { type: 'Track Lubrication', dueDate: '2024-08-25', cost: 950, confidence: 89 }
      ],
      lifespan: {
        expectedLifespan: 30,
        remainingYears: 21,
        monthlyMaintenanceCost: 1200,
        projectedAnnualCost: 14400,
        replacementCost: 650000,
        condition: 96
      },
      weatherImpact: 'low',
      trafficLevel: 'high',
      avgTrainsPerDay: 285
    }
  ];

  const getConditionColor = (condition) => {
    switch(condition) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-green-600 bg-green-100';
      case 'fair': return 'text-yellow-600 bg-yellow-100';
      case 'poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getLineColor = (line) => {
    switch(line) {
      case 'Red Line': return 'text-red-600';
      case 'Blue Line': return 'text-blue-600';
      case 'Green Line': return 'text-green-600';
      case 'Orange Line': return 'text-orange-600';
      case 'Purple Line': return 'text-purple-600';
      case 'Pink Line': return 'text-pink-600';
      case 'Brown Line': return 'text-yellow-700';
      case 'Yellow Line': return 'text-yellow-500';
      default: return 'text-gray-600';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const TrackDetail = ({ segment }) => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">{segment.id} - {segment.segment}</h2>
        <div className="flex space-x-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getConditionColor(segment.condition)}`}>
            {segment.condition.toUpperCase()}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(segment.priority)}`}>
            {segment.priority.toUpperCase()} PRIORITY
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Segment Information</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Line:</span>
              <span className={`text-sm font-medium ${getLineColor(segment.line)}`}>{segment.line}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Length:</span>
              <span className="text-sm font-medium">{segment.mileage} miles</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Installed:</span>
              <span className="text-sm font-medium">{segment.yearInstalled}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">From:</span>
              <span className="text-sm font-medium">{segment.startStation}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">To:</span>
              <span className="text-sm font-medium">{segment.endStation}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage & Traffic</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Trains per Day:</span>
              <span className="text-sm font-medium">{segment.avgTrainsPerDay}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Traffic Level:</span>
              <span className="text-sm font-medium capitalize">{segment.trafficLevel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Weather Impact:</span>
              <span className="text-sm font-medium capitalize">{segment.weatherImpact}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Last Maintenance:</span>
              <span className="text-sm font-medium">{segment.lastMaintenance}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Condition Analysis</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Condition Score:</span>
              <span className={`text-sm font-medium ${getConditionColor(segment.condition)}`}>
                {segment.lifespan.condition}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className={`h-2 rounded-full ${
                  segment.lifespan.condition >= 80 ? 'bg-green-500' :
                  segment.lifespan.condition >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${segment.lifespan.condition}%` }}
              ></div>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Expected Life:</span>
              <span className="text-sm font-medium">{segment.lifespan.expectedLifespan} years</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Remaining:</span>
              <span className="text-sm font-medium">{segment.lifespan.remainingYears} years</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Analysis</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Monthly Cost:</span>
              <span className="text-sm font-medium">{formatCurrency(segment.lifespan.monthlyMaintenanceCost)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Annual Cost:</span>
              <span className="text-sm font-medium">{formatCurrency(segment.lifespan.projectedAnnualCost)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Replacement Cost:</span>
              <span className="text-sm font-medium">{formatCurrency(segment.lifespan.replacementCost)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Cost per Mile:</span>
              <span className="text-sm font-medium">
                {formatCurrency(segment.lifespan.monthlyMaintenanceCost / segment.mileage)}/mi
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">AI Maintenance Predictions</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {segment.nextPredictedMaintenance.map((maintenance, index) => (
            <div key={index} className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {maintenance.type.includes('Emergency') || maintenance.type.includes('Critical') ? 
                    <AlertTriangle className="h-5 w-5 text-red-500" /> :
                    maintenance.type.includes('Signal') ? 
                    <Signal className="h-5 w-5 text-blue-500" /> :
                    maintenance.type.includes('Rail') || maintenance.type.includes('Track') ?
                    <Construction className="h-5 w-5 text-orange-500" /> :
                    <Wrench className="h-5 w-5 text-gray-400" />
                  }
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{maintenance.type}</p>
                  <p className="text-sm text-gray-500">Due: {maintenance.dueDate}</p>
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

      {segment.condition === 'poor' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
            <h4 className="text-sm font-medium text-red-800">Critical Maintenance Required</h4>
          </div>
          <p className="text-sm text-red-700 mt-1">
            This track segment is in poor condition and requires immediate attention. Emergency maintenance 
            is scheduled within the next few days to ensure passenger safety.
          </p>
        </div>
      )}
    </div>
  );

  const CriticalIssues = () => {
    const criticalSegments = trackSegments.filter(segment => 
      segment.priority === 'critical' || segment.condition === 'poor'
    );

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Critical Track Issues</h2>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
            <div>
              <h3 className="text-lg font-medium text-red-800">
                {criticalSegments.length} Critical Issues Require Immediate Attention
              </h3>
              <p className="text-sm text-red-700 mt-1">
                Total estimated cost for critical repairs: {formatCurrency(
                  criticalSegments.reduce((sum, segment) => 
                    sum + segment.nextPredictedMaintenance.reduce((mainSum, maint) => mainSum + maint.cost, 0), 0
                  )
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {criticalSegments.map((segment) => (
            <div key={segment.id} className="bg-white rounded-lg shadow border-l-4 border-red-500">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {segment.id} - {segment.segment}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLineColor(segment.line)} bg-gray-100`}>
                    {segment.line}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Condition</p>
                    <p className={`text-sm font-medium ${getConditionColor(segment.condition)}`}>
                      {segment.condition.toUpperCase()} ({segment.lifespan.condition}%)
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Next Maintenance</p>
                    <p className="text-sm font-medium text-red-600">
                      {segment.nextPredictedMaintenance[0].dueDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Estimated Cost</p>
                    <p className="text-sm font-medium">
                      {formatCurrency(segment.nextPredictedMaintenance[0].cost)}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Urgent Maintenance Tasks:</h4>
                  <div className="space-y-1">
                    {segment.nextPredictedMaintenance.slice(0, 2).map((task, index) => (
                      <div key={index} className="text-sm text-gray-600">
                        • {task.type} - Due {task.dueDate} ({formatCurrency(task.cost)})
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedSegment(segment)}
                  className="mt-4 bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  View Detailed Analysis
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const systemStats = {
    totalMiles: trackSegments.reduce((sum, segment) => sum + segment.mileage, 0),
    avgCondition: Math.round(
      trackSegments.reduce((sum, segment) => sum + segment.lifespan.condition, 0) / trackSegments.length
    ),
    totalMonthlyCost: trackSegments.reduce((sum, segment) => sum + segment.lifespan.monthlyMaintenanceCost, 0),
    criticalCount: trackSegments.filter(s => s.priority === 'critical').length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Track Operations</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => setView('overview')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              view === 'overview' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Track Overview
          </button>
          <button
            onClick={() => setView('critical')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              view === 'critical' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Critical Issues
          </button>
        </div>
      </div>

      {/* System Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <MapPin className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Track Miles</p>
              <p className="text-2xl font-semibold text-gray-900">{systemStats.totalMiles}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Signal className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Average Condition</p>
              <p className="text-2xl font-semibold text-gray-900">{systemStats.avgCondition}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Monthly Cost</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatCurrency(systemStats.totalMonthlyCost / 1000)}K
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Critical Issues</p>
              <p className="text-2xl font-semibold text-gray-900">{systemStats.criticalCount}</p>
            </div>
          </div>
        </div>
      </div>

      {view === 'overview' && !selectedSegment && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Track Segment Status</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {trackSegments.map((segment) => (
              <div key={segment.id} className="px-6 py-4 hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedSegment(segment)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <MapPin className="h-6 w-6 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{segment.id} - {segment.segment}</p>
                      <p className="text-sm text-gray-500">
                        {segment.line} | {segment.mileage} miles | Installed {segment.yearInstalled}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(segment.condition)}`}>
                      {segment.condition.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(segment.priority)}`}>
                      {segment.priority.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-900">
                      {formatCurrency(segment.lifespan.monthlyMaintenanceCost)}/mo
                    </span>
                    {segment.priority === 'critical' && (
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'overview' && selectedSegment && (
        <div>
          <button
            onClick={() => setSelectedSegment(null)}
            className="mb-4 text-purple-600 hover:text-purple-800 text-sm font-medium"
          >
            ← Back to Track Overview
          </button>
          <TrackDetail segment={selectedSegment} />
        </div>
      )}

      {view === 'critical' && <CriticalIssues />}
    </div>
  );
};

export default TrackOperations;
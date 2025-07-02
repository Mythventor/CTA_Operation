import React from 'react';
import { AlertTriangle, Bus, Train, Settings, DollarSign, Clock, TrendingUp } from 'lucide-react';

const Dashboard = ({ onNavigate }) => {
  const systemOverview = {
    buses: {
      total: 1847,
      operational: 1623,
      maintenance: 178,
      criticalAlerts: 23,
      avgAge: 8.2,
      monthlyMaintenanceCost: 485000
    },
    trains: {
      total: 1492,
      operational: 1398,
      maintenance: 67,
      criticalAlerts: 8,
      avgAge: 12.5,
      monthlyMaintenanceCost: 892000
    },
    tracks: {
      totalMiles: 224.1,
      goodCondition: 198.7,
      needsMaintenance: 18.9,
      critical: 6.5,
      monthlyMaintenanceCost: 1250000
    }
  };

  const upcomingMaintenance = [
    { id: 'BUS-4521', type: 'Bus', task: 'Oil Change', dueDate: '2024-07-05', cost: 85, priority: 'medium' },
    { id: 'TRAIN-302', type: 'Train', task: 'Brake Inspection', dueDate: '2024-07-03', cost: 1200, priority: 'high' },
    { id: 'TRACK-ML-15', type: 'Track', task: 'Rail Replacement', dueDate: '2024-07-08', cost: 45000, priority: 'critical' },
    { id: 'BUS-7829', type: 'Bus', task: 'Transmission Service', dueDate: '2024-07-06', cost: 850, priority: 'high' },
    { id: 'TRAIN-118', type: 'Train', task: 'Motor Overhaul', dueDate: '2024-07-12', cost: 8500, priority: 'medium' }
  ];

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  const StatCard = ({ title, value, subtitle, icon: Icon, color, onClick }) => (
    <div 
      className={`bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow ${onClick ? 'hover:bg-gray-50' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center">
        <Icon className={`h-8 w-8 ${color}`} />
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">CTA Maintenance Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* System Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Bus Fleet</h3>
            <Bus className="h-6 w-6 text-blue-600" />
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Operational:</span>
              <span className="text-sm font-medium">{systemOverview.buses.operational}/{systemOverview.buses.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">In Maintenance:</span>
              <span className="text-sm font-medium text-yellow-600">{systemOverview.buses.maintenance}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Critical Alerts:</span>
              <span className="text-sm font-medium text-red-600">{systemOverview.buses.criticalAlerts}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Avg Age:</span>
              <span className="text-sm font-medium">{systemOverview.buses.avgAge} years</span>
            </div>
          </div>
          <button 
            onClick={() => onNavigate('bus')}
            className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            View Bus Operations
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Train Fleet</h3>
            <Train className="h-6 w-6 text-green-600" />
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Operational:</span>
              <span className="text-sm font-medium">{systemOverview.trains.operational}/{systemOverview.trains.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">In Maintenance:</span>
              <span className="text-sm font-medium text-yellow-600">{systemOverview.trains.maintenance}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Critical Alerts:</span>
              <span className="text-sm font-medium text-red-600">{systemOverview.trains.criticalAlerts}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Avg Age:</span>
              <span className="text-sm font-medium">{systemOverview.trains.avgAge} years</span>
            </div>
          </div>
          <button 
            onClick={() => onNavigate('train')}
            className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
          >
            View Train Operations
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Track System</h3>
            <Settings className="h-6 w-6 text-purple-600" />
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Miles:</span>
              <span className="text-sm font-medium">{systemOverview.tracks.totalMiles}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Good Condition:</span>
              <span className="text-sm font-medium text-green-600">{systemOverview.tracks.goodCondition} mi</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Needs Maintenance:</span>
              <span className="text-sm font-medium text-yellow-600">{systemOverview.tracks.needsMaintenance} mi</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Critical:</span>
              <span className="text-sm font-medium text-red-600">{systemOverview.tracks.critical} mi</span>
            </div>
          </div>
          <button 
            onClick={() => onNavigate('track')}
            className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors"
          >
            View Track Operations
          </button>
        </div>
      </div>

      {/* Cost Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Monthly Bus Maintenance"
          value={`$${(systemOverview.buses.monthlyMaintenanceCost / 1000).toFixed(0)}K`}
          subtitle="Current month projection"
          icon={DollarSign}
          color="text-blue-600"
        />
        <StatCard
          title="Monthly Train Maintenance"
          value={`$${(systemOverview.trains.monthlyMaintenanceCost / 1000).toFixed(0)}K`}
          subtitle="Current month projection"
          icon={DollarSign}
          color="text-green-600"
        />
        <StatCard
          title="Monthly Track Maintenance"
          value={`$${(systemOverview.tracks.monthlyMaintenanceCost / 1000).toFixed(0)}K`}
          subtitle="Current month projection"
          icon={DollarSign}
          color="text-purple-600"
        />
        <StatCard
          title="Total Monthly Cost"
          value={`$${((systemOverview.buses.monthlyMaintenanceCost + systemOverview.trains.monthlyMaintenanceCost + systemOverview.tracks.monthlyMaintenanceCost) / 1000).toFixed(0)}K`}
          subtitle="All systems combined"
          icon={TrendingUp}
          color="text-gray-600"
        />
      </div>

      {/* Upcoming Maintenance */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Maintenance (Next 14 Days)</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {upcomingMaintenance.map((item) => (
            <div key={item.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                  {item.priority.toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.id}</p>
                  <p className="text-sm text-gray-500">{item.type} - {item.task}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">${item.cost.toLocaleString()}</p>
                <p className="text-sm text-gray-500">Due: {item.dueDate}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
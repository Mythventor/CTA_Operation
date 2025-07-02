import React, { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, AlertTriangle, BarChart3, PieChart } from 'lucide-react';

const CostAnalysis = ({ 
  vehicle, 
  title = "Cost Analysis",
  type = "vehicle" // vehicle, track, system
}) => {
  const [viewType, setViewType] = useState('summary'); // summary, breakdown, projection

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const calculateBreakEvenMetrics = () => {
    if (!vehicle.lifespan) return null;

    const monthsToBreakEven = vehicle.lifespan.breakEvenPoint?.monthsRemaining || 0;
    const totalMaintenanceCostToBreakEven = monthsToBreakEven * vehicle.lifespan.monthlyMaintenanceCost;
    const costSavingsFromReplacement = vehicle.lifespan.replacementCost - totalMaintenanceCostToBreakEven;
    const isApproaching = monthsToBreakEven <= 6;

    return {
      monthsToBreakEven,
      totalMaintenanceCostToBreakEven,
      costSavingsFromReplacement,
      isApproaching,
      recommendation: isApproaching ? 'Replace Soon' : 'Continue Maintenance'
    };
  };

  const getCostBreakdown = () => {
    if (!vehicle.nextPredictedMaintenance) return [];
    
    const breakdown = {};
    vehicle.nextPredictedMaintenance.forEach(item => {
      const category = item.type.includes('Oil') || item.type.includes('Fluid') ? 'Fluids & Filters' :
                     item.type.includes('Brake') ? 'Braking System' :
                     item.type.includes('Engine') || item.type.includes('Motor') ? 'Propulsion' :
                     item.type.includes('Transmission') ? 'Transmission' :
                     item.type.includes('HVAC') || item.type.includes('Air') ? 'Climate Control' :
                     item.type.includes('Door') ? 'Doors & Safety' :
                     item.type.includes('Signal') || item.type.includes('Communication') ? 'Electronics' :
                     item.type.includes('Track') || item.type.includes('Rail') ? 'Infrastructure' :
                     'Other';
      
      if (!breakdown[category]) {
        breakdown[category] = { cost: 0, items: 0 };
      }
      breakdown[category].cost += item.cost;
      breakdown[category].items += 1;
    });

    return Object.entries(breakdown).map(([category, data]) => ({
      category,
      cost: data.cost,
      items: data.items,
      percentage: (data.cost / vehicle.nextPredictedMaintenance.reduce((sum, item) => sum + item.cost, 0)) * 100
    })).sort((a, b) => b.cost - a.cost);
  };

  const breakEvenMetrics = calculateBreakEvenMetrics();
  const costBreakdown = getCostBreakdown();

  const SummaryView = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center">
            <DollarSign className="h-6 w-6 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm text-blue-600">Monthly Cost</p>
              <p className="text-lg font-semibold text-blue-800">
                {formatCurrency(vehicle.lifespan?.monthlyMaintenanceCost || 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center">
            <TrendingUp className="h-6 w-6 text-green-600" />
            <div className="ml-3">
              <p className="text-sm text-green-600">Annual Projection</p>
              <p className="text-lg font-semibold text-green-800">
                {formatCurrency(vehicle.lifespan?.projectedAnnualCost || 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center">
            <BarChart3 className="h-6 w-6 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm text-purple-600">Replacement Cost</p>
              <p className="text-lg font-semibold text-purple-800">
                {formatCurrency(vehicle.lifespan?.replacementCost || 0)}
              </p>
            </div>
          </div>
        </div>

        <div className={`p-4 rounded-lg ${breakEvenMetrics?.isApproaching ? 'bg-red-50' : 'bg-gray-50'}`}>
          <div className="flex items-center">
            <AlertTriangle className={`h-6 w-6 ${breakEvenMetrics?.isApproaching ? 'text-red-600' : 'text-gray-600'}`} />
            <div className="ml-3">
              <p className={`text-sm ${breakEvenMetrics?.isApproaching ? 'text-red-600' : 'text-gray-600'}`}>
                Break-Even Status
              </p>
              <p className={`text-lg font-semibold ${breakEvenMetrics?.isApproaching ? 'text-red-800' : 'text-gray-800'}`}>
                {breakEvenMetrics?.monthsToBreakEven || 0} months
              </p>
            </div>
          </div>
        </div>
      </div>

      {breakEvenMetrics && (
        <div className={`p-6 rounded-lg border-l-4 ${
          breakEvenMetrics.isApproaching ? 'bg-red-50 border-red-500' : 'bg-green-50 border-green-500'
        }`}>
          <h4 className={`font-medium ${breakEvenMetrics.isApproaching ? 'text-red-900' : 'text-green-900'}`}>
            Break-Even Analysis
          </h4>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className={`text-sm ${breakEvenMetrics.isApproaching ? 'text-red-700' : 'text-green-700'}`}>
                Maintenance to Break-Even:
              </p>
              <p className="font-semibold">{formatCurrency(breakEvenMetrics.totalMaintenanceCostToBreakEven)}</p>
            </div>
            <div>
              <p className={`text-sm ${breakEvenMetrics.isApproaching ? 'text-red-700' : 'text-green-700'}`}>
                Cost Difference:
              </p>
              <p className="font-semibold">{formatCurrency(Math.abs(breakEvenMetrics.costSavingsFromReplacement))}</p>
            </div>
            <div>
              <p className={`text-sm ${breakEvenMetrics.isApproaching ? 'text-red-700' : 'text-green-700'}`}>
                Recommendation:
              </p>
              <p className="font-semibold">{breakEvenMetrics.recommendation}</p>
            </div>
          </div>
          <p className={`text-sm mt-3 ${breakEvenMetrics.isApproaching ? 'text-red-700' : 'text-green-700'}`}>
            {breakEvenMetrics.isApproaching 
              ? '⚠️ Consider replacement planning. Continuing maintenance may become more expensive than replacement.'
              : '✅ Current maintenance schedule is cost-effective. Continue regular maintenance.'
            }
          </p>
        </div>
      )}
    </div>
  );

  const BreakdownView = () => (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold text-gray-900">Cost Breakdown by Category</h4>
      
      <div className="grid gap-4">
        {costBreakdown.map((item, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900">{item.category}</span>
              <span className="font-semibold text-gray-900">{formatCurrency(item.cost)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{item.items} maintenance items</span>
              <span>{item.percentage.toFixed(1)}% of total cost</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h5 className="font-medium text-blue-900 mb-2">Cost Insights</h5>
        <div className="text-sm text-blue-800 space-y-1">
          <p>• Highest cost category: {costBreakdown[0]?.category} ({formatCurrency(costBreakdown[0]?.cost || 0)})</p>
          <p>• Most frequent maintenance: {costBreakdown.find(item => item.items === Math.max(...costBreakdown.map(i => i.items)))?.category}</p>
          <p>• Total upcoming maintenance cost: {formatCurrency(costBreakdown.reduce((sum, item) => sum + item.cost, 0))}</p>
        </div>
      </div>
    </div>
  );

  const ProjectionView = () => {
    const months = [1, 3, 6, 12, 24];
    const projections = months.map(month => ({
      months: month,
      cost: month * (vehicle.lifespan?.monthlyMaintenanceCost || 0),
      cumulativeCost: month * (vehicle.lifespan?.monthlyMaintenanceCost || 0)
    }));

    return (
      <div className="space-y-6">
        <h4 className="text-lg font-semibold text-gray-900">Cost Projections</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {projections.map((proj, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600">{proj.months} Month{proj.months > 1 ? 's' : ''}</p>
              <p className="text-lg font-semibold text-gray-900">{formatCurrency(proj.cost)}</p>
              <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                <div 
                  className="bg-blue-600 h-1 rounded-full" 
                  style={{ width: `${(proj.cost / projections[projections.length - 1].cost) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border rounded-lg p-6">
          <h5 className="font-medium text-gray-900 mb-4">Cost Trend Analysis</h5>
          <div className="h-40 bg-gray-50 rounded flex items-center justify-center">
            <span className="text-gray-500">Cost trend chart visualization would appear here</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h5 className="font-medium text-yellow-900 mb-2">Cost Optimization Opportunities</h5>
            <div className="text-sm text-yellow-800 space-y-1">
              <p>• Bundle similar maintenance tasks to reduce labor costs</p>
              <p>• Schedule preventive maintenance during off-peak hours</p>
              <p>• Consider bulk purchasing of common replacement parts</p>
              <p>• Evaluate third-party vs in-house maintenance options</p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h5 className="font-medium text-blue-900 mb-2">Risk Factors</h5>
            <div className="text-sm text-blue-800 space-y-1">
              <p>• Age-related cost increases: {vehicle.year ? new Date().getFullYear() - vehicle.year : 'N/A'} years old</p>
              <p>• High-mileage maintenance escalation expected</p>
              <p>• Weather and environmental impact on maintenance frequency</p>
              <p>• Parts availability and supply chain considerations</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setViewType('summary')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewType === 'summary' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              Summary
            </button>
            <button
              onClick={() => setViewType('breakdown')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewType === 'breakdown' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              Breakdown
            </button>
            <button
              onClick={() => setViewType('projection')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewType === 'projection' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              Projection
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {viewType === 'summary' && <SummaryView />}
        {viewType === 'breakdown' && <BreakdownView />}
        {viewType === 'projection' && <ProjectionView />}
      </div>
    </div>
  );
};

export default CostAnalysis;
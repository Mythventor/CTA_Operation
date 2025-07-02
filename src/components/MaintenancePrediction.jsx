import React from 'react';
import { Calendar, DollarSign, TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const MaintenancePrediction = ({ 
  predictions, 
  title = "Maintenance Predictions",
  vehicleId,
  showConfidence = true,
  maxItems = null 
}) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 95) return 'text-green-600 bg-green-100';
    if (confidence >= 85) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getPriorityIcon = (type, dueDate) => {
    const due = new Date(dueDate);
    const now = new Date();
    const daysUntilDue = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
    
    if (daysUntilDue <= 3) return <AlertTriangle className="h-5 w-5 text-red-500" />;
    if (daysUntilDue <= 7) return <Clock className="h-5 w-5 text-yellow-500" />;
    return <CheckCircle className="h-5 w-5 text-green-500" />;
  };

  const getDaysUntilDue = (dueDate) => {
    const due = new Date(dueDate);
    const now = new Date();
    const daysUntilDue = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
    return daysUntilDue;
  };

  const sortedPredictions = [...predictions].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  const displayPredictions = maxItems ? sortedPredictions.slice(0, maxItems) : sortedPredictions;

  const totalCost = predictions.reduce((sum, pred) => sum + pred.cost, 0);
  const nextMaintenanceDate = sortedPredictions[0]?.dueDate;

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {vehicleId && (
            <span className="text-sm text-gray-500">{vehicleId}</span>
          )}
        </div>
        
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-blue-500" />
            <div>
              <p className="text-xs text-gray-500">Next Maintenance</p>
              <p className="text-sm font-medium">{nextMaintenanceDate || 'N/A'}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-green-500" />
            <div>
              <p className="text-xs text-gray-500">Total Cost</p>
              <p className="text-sm font-medium">{formatCurrency(totalCost)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-purple-500" />
            <div>
              <p className="text-xs text-gray-500">Items Scheduled</p>
              <p className="text-sm font-medium">{predictions.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {displayPredictions.map((prediction, index) => {
          const daysUntilDue = getDaysUntilDue(prediction.dueDate);
          const isUrgent = daysUntilDue <= 7;
          
          return (
            <div key={index} className={`px-6 py-4 hover:bg-gray-50 ${isUrgent ? 'bg-red-50' : ''}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {getPriorityIcon(prediction.type, prediction.dueDate)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{prediction.type}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Due: {prediction.dueDate}</span>
                      {prediction.dueMileage && (
                        <span>| {prediction.dueMileage.toLocaleString()} miles</span>
                      )}
                      <span className={`px-2 py-1 rounded text-xs ${
                        daysUntilDue <= 3 ? 'bg-red-100 text-red-800' :
                        daysUntilDue <= 7 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {daysUntilDue > 0 ? `${daysUntilDue} days` : 'Overdue'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{formatCurrency(prediction.cost)}</p>
                  {showConfidence && prediction.confidence && (
                    <span className={`text-xs px-2 py-1 rounded-full ${getConfidenceColor(prediction.confidence)}`}>
                      {prediction.confidence}% confidence
                    </span>
                  )}
                </div>
              </div>
              
              {/* Progress bar showing urgency */}
              {isUrgent && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div 
                      className={`h-1 rounded-full ${
                        daysUntilDue <= 3 ? 'bg-red-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${Math.max(10, (7 - daysUntilDue) / 7 * 100)}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {maxItems && predictions.length > maxItems && (
        <div className="px-6 py-3 bg-gray-50 text-center">
          <span className="text-sm text-gray-500">
            Showing {maxItems} of {predictions.length} predictions
          </span>
        </div>
      )}
    </div>
  );
};

export default MaintenancePrediction;
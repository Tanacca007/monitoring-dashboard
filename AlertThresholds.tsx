const AlertThresholds = () => {
  const [thresholds, setThresholds] = useState({
    responseTime: { warning: 1000, critical: 2000 },
    compression: { warning: 50, critical: 30 },
    assetCount: { warning: 20, critical: 30 },
    cacheHitRate: { warning: 70, critical: 50 }
  });

  return (
    <div className="alert-thresholds">
      <h4 className="text-sm font-medium mb-3">Alert Thresholds</h4>
      
      {Object.entries(thresholds).map(([metric, levels]) => (
        <ThresholdControl
          key={metric}
          metric={metric}
          levels={levels}
          onChange={(newLevels) => {
            setThresholds({
              ...thresholds,
              [metric]: newLevels
            });
          }}
        />
      ))}
    </div>
  );
};

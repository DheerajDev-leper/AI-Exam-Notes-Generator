function Chart({charts}) {
    if (!charts || charts.length === 0) return null;
  return (
    <div>
        {charts.map({chart,index})}
    </div>
  )
}

export default Chart
import React, { useContext, useEffect, useState, useRef, useMemo } from 'react';
import { Metrics, MetricsContext } from '../contexts/metricsContext';
import './mortgageComparisonSchedule.scss';

interface MortgageComparisonSchedule {
  toggle: boolean
}

const MortgageComparisonSchedule: React.FC<MortgageComparisonSchedule> = ({toggle}) => {
  const {
    purchasePrice,
    downPayment,
    loanAmount,
    term,
    rate,
    mortgageTotal,
  
    points,
    pointsPercent,
    pointsRate,
    pointsCost,
    pointsWithDownPayment,
    mortgageTotalWithPoints,
  } = useContext<Metrics>(MetricsContext)

  const [open, setOpen] = useState(false);
  const [comparisonSchedule, setComparisonSchedule] = useState<Metrics[]>([]);

  const addToComparisonSchedule = () => {
    const newComparisonSchedule = [...comparisonSchedule];
    if(comparisonSchedule.length <= 3) {
      newComparisonSchedule.push({
      purchasePrice,
      downPayment,
      loanAmount,
      term,
      rate,
      mortgageTotal,
    
      points,
      pointsPercent,
      pointsRate,
      pointsCost,
      pointsWithDownPayment,
      mortgageTotalWithPoints,
    })
    setComparisonSchedule(newComparisonSchedule)
    } else {
      alert('Maximum 4 calculations...')
    }
  }

  const removeFromComparisonSchedule = (index: number) => {
    setComparisonSchedule(comparisonSchedule.filter((schedule, i) => i !== index ));
  }
  
  useEffect(() => {
    setOpen(toggle)
  }, [toggle])
  
  return open === false ? <button onClick={addToComparisonSchedule}>Add</button> : (
    <>
      <button onClick={addToComparisonSchedule}>Add</button>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Purchase Price</th>
            <th>Down Payment</th>
            <th>Loan Amount</th>
            <th>Term</th>
            <th>Interest Rate</th>
            <th>Mortgage Total</th>

            <th>Points</th>
            <th>Points %</th>
            <th>Points Rate</th>
            <th>Points Cost</th>
            <th>Points with Down Payment</th>
            <th>Points Mortgage Total</th>
          </tr>
        {
          comparisonSchedule.map((schedule, i) => {
            return (
              <tr key={i}>
                <td>Calculation {i+1}</td>
                <td>{schedule.purchasePrice}</td>
                <td>{schedule.downPayment}</td>
                <td>{schedule.loanAmount}</td>
                <td>{schedule.term}</td>
                <td>{schedule.rate}</td>
                <td>{schedule.mortgageTotal}</td>

                <td>{schedule.points}</td>
                <td>{schedule.pointsPercent}</td>
                <td>{schedule.pointsRate}</td>
                <td>{schedule.pointsCost}</td>
                <td>{schedule.pointsWithDownPayment}</td>
                <td>{schedule.mortgageTotalWithPoints}</td>
                <td><button onClick={() => removeFromComparisonSchedule(i)}>X</button></td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
    </>
  )
};

export default MortgageComparisonSchedule;

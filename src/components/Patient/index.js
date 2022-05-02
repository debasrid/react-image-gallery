import React, { useState, useEffect } from 'react'
import {Line} from 'react-chartjs-2'

export const Patient = ({patientData}) => {
    const [chartData, setChartData]  = useState({});
    const patientChartData = patientData.map(a => a.y);
    const patientChartLabel = patientData.map(a => a.x);

    Line.options =  {
        legend: {
            display: false
        },
        tooltips: {
            callbacks: {
               label: function(tooltipItem) {
                      return tooltipItem.yLabel;
               }
            }
        }
    };

    const Chart = () => {
        setChartData({
            labels: patientChartLabel,
            datasets: 
                [{
                    label: '',
                    data: patientChartData,
                    backgroundColor: [
                        'rgba(255, 255, 255, 0)',
                    ],
                    borderColor: [
                        'rgba(0, 255, 255, 1)',
                    ],
                    borderDash: [10,5],
                    borderWidth: 1,
                    pointStyle: 'circle',
                    pointBackgroundColor: 'rgba(0, 255, 255, 1)',
                    pointRadius: 5,
                    pointBorderWidth: 9,
                    pointBorderColor: 'rgba(0, 255, 255, 0.2)',
                }]
        });    
    }
    useEffect(() => {
        Chart();
    },[patientData]);
    
    return(
        <div className="App">
            <div>
                <Line
                    data={chartData}
                    options={{
                        responsive:true,
                        title: { text: "READMISSION/ MORTALITY RISK", display: true },
                        scales:{
                            yAxes:{
                                ticks:{
                                    beginAtZero: true
                                }
                            }
                        }
                    }}
                />
            </div>
        </div>
    )
}

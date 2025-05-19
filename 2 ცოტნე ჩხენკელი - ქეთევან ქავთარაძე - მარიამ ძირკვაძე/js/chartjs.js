

console.log(new Chart());
let firstChart = new Chart(document.getElementById("first__chart-canvas").getContext("2d"), {
    type: 'line',
    data: {
        datasets: [{
            label: ["","","","","","","","","","","","","","","","","","",""],
            data: [0,0,0, 30, 15, 60,15, 60,15, 60,15, 60],
            borderWidth:1,
            borderColor: "blue",
            pointStyle: 'circle',
            radius: 0,
            backgroundColor:"white",
        },{
            label: ["","","","","","","","","","","","","","","",],
            legend: false,
            data: [0,0,0, 10, 20, 40,10, 20, 40,10, 20, 40,10, 20, 40,10, 20, 40],
            borderWidth:1,
            borderColor: "#C4CCD8",
            pointStyle: 'circle',
            radius: 0,
            backgroundColor:"white",
        }],
        labels: ['',"","","",'',"","","",'',"","","",'',"","","",'',"","",""]
    },
    options: {
        plugins: {
            datalabels: {
              display: false,
            },
            legend: {
                display: false 
            }
        },
        
        scales: {
            y: {
                ticks: {
                    display: false,
                },
                tickOptions: {
                    showGridline:false
                },
                grid: {
                    display: false,
                }
            }
        },
        legend: {
            display: false
        }
        
    },
    
});


let secondChart = new Chart(document.getElementById("second__chart-canvas").getContext("2d"), {
    type: 'line',
    data: {
        datasets: [{
            label: "",
            data: [0, 20, 10, 50, 20, 10, 50, 20, 10, 50, 20, 10, 50, 20, 10, 50],
            borderWidth:1,
            borderColor: "blue",
            pointStyle: 'circle',
            radius: 0,
            backgroundColor:"white",
        },{
            label: "",
            data: [0, 2, 15, 5],
            borderWidth:0.75,
            borderColor: "#C4CCD8",
            pointStyle: 'circle',
            radius: 0,
            backgroundColor:"white",

        }],
        labels: ['',"","",""]
    },
    options: {
        plugins: {
            datalabels: {
              display: false,
            },
            legend: {
                display: false 
            }
        },
        
        scales: {
            y: {
                ticks: {
                    display: false,
                },
                tickOptions: {
                    showGridline:false
                },
                grid: {
                    display: false,
                }
            }
        },
        
    }
});




let thirdChart = new Chart(document.getElementById("third__chart-canvas").getContext("2d"), {
    type: 'line',
    data: {
        datasets: [{
            label: '',
            data: [0, 1, 0.5, 3.7],
            borderWidth:1,
            borderColor: "blue",
            pointStyle: 'circle',
            radius: 0,
            backgroundColor:"white",
        },{
            label: '',
            data: [0, 4, 3, 2],
            borderWidth:0.3,
            borderColor: "#C4CCD8",
            pointStyle: 'circle',
            radius: 0,
            backgroundColor:"white",
        }],
        labels: ['',"","",""]
    },
    options: {
        plugins: {
            datalabels: {
              display: false,
            },
            legend: {
                display: false 
            }
            
        },
        
        scales: {
            y: {
                ticks: {
                    display: false,
                },
                tickOptions: {
                    showGridline:false
                },
                grid: {
                    display: false,
                },
            },
            
        },
        
        
    }
    
});

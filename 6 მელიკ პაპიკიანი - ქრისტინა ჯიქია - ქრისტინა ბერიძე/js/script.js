document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('myChart').getContext('2d');
    const ctx1 = document.getElementById('myChart1').getContext('2d');
    const ctx2 = document.getElementById('myChart2').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['April', 'May', 'June', 'July', 'August', 'September', 'October'],
            datasets: [{
                label: 'sales',
                data: [0, 0, 25, 60, 35, 50, 50],
                borderColor: '#C4CCD8',
                backgroundColor: '#C4CCD8',
                borderWidth: 1,

                pointRadius: 0,
                pointBackgroundColor: '#635BFF',
                pointBorderColor: '#635BFF',
                pointBorderWidth: 1

            },
            {
                label: 'sales',
                data: [0, 25, 40, 15, 55, 50, 90],
                borderColor: '#635BFF',
                backgroundColor: '#635BFF',
                borderWidth: 2,

                pointRadius: 0,
                pointBackgroundColor: '#635BFF',
                pointBorderColor: '#635BFF',
                pointBorderWidth: 1
            }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    offset: true,
                    drawBorder: false,

                    title: {
                        display: false,
                        text: 'Month'
                    },
                    ticks: {
                        display: false,
                        callback: function (value, index, values) {
                            if (index === 0) {
                                return this.getLabelForValue(value);
                            } else if (index === values.length - 1) {
                                return 'Today';
                            } else {
                                return '';
                            }
                        },
                        font: {
                            size: 10,
                            weight: 500
                        },
                        rotation: 0

                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    offset: false,
                    beginAtZero: true,
                    drawBorder: false,
                    title: {
                        display: false,
                        text: 'Values'
                    },
                    ticks: {

                        display: true,
                        drawBorder: true,
                        callback: function (value, index, values) {
                            if (index === 0) {
                                return this.getLabelForValue(value);
                            } else if (index === values.length - 1) {
                                return '$12k';
                            } else {
                                return '';
                            }
                        },
                        font: {
                            size: 10,
                            weight: 500
                        },
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                }
            },

            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            },
            elements: {
                line: {
                    borderWidth: 0
                }
            }
        }
    });

    new Chart(ctx1, {
        type: 'line',
        data: {
            labels: ['April', 'May', 'June', 'July', 'August', 'September', 'October'],
            datasets: [{
                label: 'sales',
                data: [0, 0, 15, 50, 45, 60, 60],
                borderColor: '#C4CCD8',
                backgroundColor: '#C4CCD8',
                borderWidth: 1,
                pointRadius: 0,
                pointBackgroundColor: '#635BFF',
                pointBorderColor: '#635BFF',
                pointBorderWidth: 1

            },
            {
                label: 'sales',
                data: [0, 13, 40, 20, 60, 65, 90],
                borderColor: '#635BFF',
                backgroundColor: '#635BFF',
                borderWidth: 2,
                pointRadius: 0,
                pointBackgroundColor: '#635BFF',
                pointBorderColor: '#635BFF', 
                pointBorderWidth: 1
            }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    offset: true,
                    drawBorder: false,

                    title: {
                        display: false,
                        text: 'Month'
                    },
                    ticks: {
                        display: false,
                        callback: function (value, index, values) {
                            if (index === 0) {
                                return this.getLabelForValue(value);
                            } else if (index === values.length - 1) {
                                return 'Today';
                            } else {
                                return '';
                            }
                        },
                        font: {
                            size: 10,
                            weight: 500
                        },
                        rotation: 0
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    offset: false,
                    beginAtZero: true,
                    drawBorder: false,
                    title: {
                        display: false,
                        text: 'Values'
                    },
                    ticks: {

                        display: true,
                        drawBorder: true,
                        callback: function (value, index, values) {
                            if (index === 0) {
                                return this.getLabelForValue(value);
                            } else if (index === values.length - 1) {
                                return '$12k';
                            } else {
                                return '';
                            }
                        },
                        font: {
                            size: 10,
                            weight: 500
                        },
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                }
            },

            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            },
            elements: {
                line: {
                    borderWidth: 0
                }
            }
        }
    });

    new Chart(ctx2, {
        type: 'line',
        data: {
            labels: ["12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00"], // Метки оси X
            datasets: [{
                label: 'sales',
                data: [0, 0, 0, 0, 0.2, 0.4, 0.4, 0.5, 0.5, 0.5, 0.5, 0.7, 0.7, 0.7, 0.7, 0.9, 0.9, 0.9, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3], // Данные для графика
                borderColor: '#C4CCD8',
                backgroundColor: '#C4CCD8',
                borderWidth: 1,


                pointRadius: 0,
                pointBackgroundColor: '#635BFF',
                pointBorderColor: '#635BFF',
                pointBorderWidth: 1
            },
            {
                label: 'sales',
                data: [0, 0, 0, 0, 0, 0.4, 0.4, 0.4, 0.4, 0.4, 1, 1.2, 1.2, 1.3, 1.3], // Данные для графика
                borderColor: '#635BFF',
                backgroundColor: '#635BFF',
                borderWidth: 1,

                pointRadius: 0,
                pointBackgroundColor: '#635BFF',
                pointBorderColor: '#635BFF',
                pointBorderWidth: 1,

                pointRadius: function (context) {
                    return context.dataIndex === context.dataset.data.length - 1 ? 2 : 0; // Последняя точка имеет радиус 6, остальные - 0
                },
            }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    offset: false,
                    drawBorder: false,

                    title: {
                        display: false,
                        text: 'Month'
                    },
                    ticks: {

                        display: false,
                        font: {
                            size: 10,
                            weight: 500
                        },
                        rotation: 0
                    },
                    grid: {
                        display: true,
                        drawTicks: false, 
                    }
                },
                y: {
                    offset: false,
                    drawBorder: false,
                    title: {
                        display: false,
                        text: 'Values'
                    },
                    ticks: {
                        display: false,
                        drawBorder: true,
                        stepSize: 1,
                        font: {
                            size: 10,
                            weight: 500
                        },
                    },
                    grid: {
                        display: false,
                        drawBorder: false,
                        drawTicks: false,
                    }
                }
            },

            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            },
            elements: {
                line: {
                    borderWidth: 0
                }
            }
        }
    });


    const burger = document.querySelector('header .header__burger'),
        headerMenu = document.querySelector('header .header__menu'),
        closeIcon = document.querySelector('header .header__nav .close-icon');
        body = document.body;


    // console.log(burger);

    burger.addEventListener('click', () => {
        headerMenu.classList.add('active');
        body.classList.add('lock');
    });

    closeIcon.addEventListener('click', () => {
        if (headerMenu.classList.contains('active')) {
            headerMenu.classList.remove('active');
        }

        if (body.classList.contains('lock')) {
            body.classList.remove('lock');
        }
    });
});

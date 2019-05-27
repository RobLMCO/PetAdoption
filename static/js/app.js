var slider = document.getElementById("myRange");
var output = document.getElementById("sample");


// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
  optionChanged(this.value);
  //console.log(this.value);
}

//init function to execute on first load of index.html.
function init() {

  console.log("Initialising...")

  var selector =document.getElementById("selDataset");
  Plotly.d3.json("/Adoptions",function(error,response){
    if(error) console.warn(error);
    var dropdown_select = Plotly.d3.select("#selDataset");
    for(var i=0;i<response.length;i++){
       dropdown_select.append("option").attr("value",response[i]).text(response[i]);
   }
   
   console.log("Adoptions array: ", response)
   optionChanged(response[0]);
  });
}

function buildMetadata(sample) {
  var selector = document.getElementById("selDataset");
  console.log("Fetching metadata... ")
  var slider = document.getElementById("myRange");
  if (sample == slider.value) {
    console.log("sample: " + selector.value + "," + sample);
    var url="/metadata/" + selector.value + "," + sample;
  } 
  else 
  {
      console.log("sample: " + sample + "," + slider.value);
      var url="/metadata/" + sample + "," + slider.value;
  };

  console.log(url);
  d3.json(url).then(function(response){
    try {
      console.log("API error");
      throw({message:"API error"});
  } catch(e) {
    console.log(response);
    var metadata_Sample= d3.select("#sample-metadata");
    var attribute_value;
    metadata_Sample.selectAll("p").remove();
    adoption_filter = [];
    filter_label = ["Attribute", "Total", "Value"];
    for(var key in response){
        if(response.hasOwnProperty(key)){
            if (key == 2){
              attribute_value = Math.round(response[key] / (14993 / response[key - 1]));
              metadata_Sample.append("p").text(filter_label[key] + ":   " + attribute_value);
              adoption_filter[key] = attribute_value;
            } else {
            metadata_Sample.append("p").text(filter_label[key] + ":   " + response[key]);
            adoption_filter[key] = response[key];
            };
        } 
    }
    console.log(adoption_filter);
    console.log("End of metadata");
    buildGauge(response.rate);
  }
}, 500);
}  
    
function Plotchart(sample){
  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Pet Adoption Data By Area"
    },
    axisX: {
      valueFormatString: "######"
    },
    axisY: {
      prefix: "",
      labelFormatter: addSymbols
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: "pointer",
      itemclick: toggleDataSeries
    },
    data: [
    {
      type: "column",
      name: "Adoptions",
      showInLegend: true,
      xValueFormatString: "######",
      yValueFormatString: "#,##0",
      dataPoints: [
        { x: 02, y: 20000, indexLabel: "Perlis" },
        { x: 08, y: 30000, indexLabel: "Kedah" },
        { x: 13, y: 25000, indexLabel: "Palau Pinor" },
        { x: 18, y: 70000, indexLabel: "Kelantan" },
        { x: 23, y: 50000, indexLabel: "Terengganu" },
        { x: 27, y: 35000, indexLabel: "Pahang"  },
        { x: 30, y: 30000, indexLabel: "Perak"  },
        { x: 48, y: 43000, indexLabel: "Selangor"  },
        { x: 50, y: 35000, indexLabel: "Kuala Lumpur"  },
        { x: 72, y: 30000, indexLabel: "Negeri Sembilan"  },
        { x: 78, y: 40000, indexLabel: "Melaka"  },
        { x: 86, y: 50000, indexLabel: "Johor"  },
        { x: 87, y: 25000, indexLabel: "Labuan"  },
        { x: 90, y: 12500, indexLabel: "Sabah"  },
        { x: 96, y: 45000, indexLabel: "Sarawak"  }
      ]
    }, 
    {
      type: "line",
      name: "Attribute",
      showInLegend: true,
      yValueFormatString: "#,##0",
      dataPoints: [
        { x: 02, y: 40000 },
        { x: 08, y: 42000 },
        { x: 13, y: 45000 },
        { x: 18, y: 45000 },
        { x: 23, y: 47000 },
        { x: 27, y: 43000 },
        { x: 30, y: 42000 },
        { x: 48, y: 43000 },
        { x: 50, y: 41000 },
        { x: 72, y: 45000 },
        { x: 78, y: 42000 },
        { x: 86, y: 50000 },
        { x: 87, y: 46000 },
        { x: 90, y: 43500 },
        { x: 96, y: 44000 }
      ]
    },
    {
      type: "area",
      name: "Average Adoption Rate",
      markerBorderColor: "white",
      markerBorderThickness: 2,
      showInLegend: true,
      yValueFormatString: "#,##0",
      dataPoints: [
        { x: 02, y: 1 },
        { x: 08, y: 1 },
        { x: 13, y: 2 },
        { x: 18, y: 2 },
        { x: 23, y: 1 },
        { x: 27, y: 1 },
        { x: 30, y: 2 },
        { x: 48, y: 3 },
        { x: 50, y: 4 },
        { x: 72, y: 4 },
        { x: 78, y: 3 },
        { x: 86, y: 2 },
        { x: 87, y: 2 },
        { x: 90, y: 1 },
        { x: 96, y: 1 }
      ]
    }]
  });
  chart.render();
  
  function addSymbols(e) {
    var suffixes = ["", "K", "M", "B"];
    var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
  
    if(order > suffixes.length - 1)                	
      order = suffixes.length - 1;
  
    var suffix = suffixes[order];      
    return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
  }
  
  function toggleDataSeries(e) {
    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    e.chart.render();
  }
}

function optionChanged(newSample) {
  //console.clear()
  //var notes = d3.selectAll("#notes");
  // var allnotes = document.getElementById('notes');
  //notes.innerHTML = "";
  // allnotes.innerHTML = "";
 
  var output = document.getElementById("sample");
  var slider = document.getElementById("myRange");
  var selector = document.getElementById("selDataset");
  var slidervalue = slider.value;
  output.innerHTML = slidervalue; // Display the default slider value
  console.log("optionchanged detected and new sample selected")
  if (newSample == slidervalue) {
    console.log("new sample: " + selector.value + "," + newSample)} 
  else console.log("new sample: " + newSample + "," + slider.value);
  
  buildMetadata(newSample);

  //Update the scatter plot for the new sample selected.
  Plotchart(newSample);
}

window.onload = function () {

  
  
  }
  

// Initialize the dashboard
init();
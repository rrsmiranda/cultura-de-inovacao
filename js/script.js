var mycolors = ["#476088","#7d61e8","#61a8e8", "#4fddc3","#ffc562","#60cf83","#cf60bc","#ff6d74", , "#60cf83"];
          
var radarChartOptions = {
  w: 200,
  h: 200,
  //margin: margin,
  maxValue: 60,
  levels: 6,
  roundStrokes: false,
  color: d3.scaleOrdinal().range(mycolors),
  format: '.0f',
  legend: { title: '', translateX: 100, translateY: 40 },
  unit: ''
};

var radarChartOptions2 = {
  w: 200,
  h: 200,
  //margin: margin,
  maxValue: 5,
  levels: 6,
  roundStrokes: false,
  color: d3.scaleOrdinal().range(["#00ffbe"]),
  format: '.0f',
  legend: { title: 'Organization XYZ', translateX: 100, translateY: 40 },
  unit: ''
};

var chartOption ={
  w: 200,
  h: 200,
  color: d3.scaleOrdinal().range(mycolors),
}

var data = [
{ 
axes: [
  {axis: 'Clima', value: 4},
  {axis: 'Sucesso', value: 2},
  {axis: 'Recursos', value: 6},
  {axis: 'Comportamento', value: 2.6},
  {axis: 'Valores', value: 3.5},
  {axis: 'Processo', value: 2}
]
}
]

var yearRingChart = new dc.PieChart("#chart-ring-year"),
//spendHistChart = new dc.BarChart("#chart-hist-spend"),
spenderRowChart = new dc.RowChart("#chart-row-setores"),
femRowChart = new dc.RowChart("#chart-row-fem"),
masRowChart = new dc.RowChart("#chart-row-mas"),
culRowChart = new dc.RowChart("#chart-row-cul"),
relRowChart = new dc.RowChart("#chart-row-rel"),
pesRowChart = new dc.RowChart("#chart-row-pes"),
estRowChart = new dc.RowChart("#chart-row-est"),
lidRowChart = new dc.RowChart("#chart-row-lid"),
infRowChart = new dc.RowChart("#chart-row-inf");

// use static or load via d3.csv("spendData.csv").then(function(spendData) {/* do stuff */});
var spendData = [
{ name: "Setor1", Spent: "$40", Year: 2011, Fem: 34, Mas:50, Cul: 100, rel: 30, lid:50, est: 100, pes: 30, inf: 60,
  axes: [{axis: 'Cultura', value: 10}, {axis: 'Liderança', value: 50}, {axis: 'Pessoas', value: 50}, 
        {axis: 'Estrutura', value: 20}, {axis: 'Estratégia', value: 30}, {axis: 'Relacionamento', value: 110}]},
{ name: "Setor2", Spent: "$10", Year: 2012, Fem: 17, Mas:30, Cul: 20, rel: 45, lid:10, est: 70, pes: 70, inf: 50,
  axes: [{axis: 'Cultura', value: 30}, {axis: 'Liderança', value: 20}, {axis: 'Pessoas', value: 80}, 
        {axis: 'Estrutura', value: 10}, {axis: 'Estratégia', value: 100}, {axis: 'Relacionamento', value: 30}]},
{ name: "Setor3", Spent: "$100", Year: 2013, Fem: 20, Mas:40, Cul: 70, rel: 10, lid:80, est: 40, pes: 60, inf: 90,
  axes: [{axis: 'Cultura', value: 20}, {axis: 'Liderança', value: 60}, {axis: 'Pessoas', value: 60}, 
        {axis: 'Estrutura', value: 60}, {axis: 'Estratégia', value: 50}, {axis: 'Relacionamento', value: 70}]},
{ name: "Setor4", Spent: "$20", Year: 2012, Fem: 10, Mas:25, Cul: 80, rel: 50, lid:30, est: 90, pes: 40, inf: 20,
  axes: [{axis: 'Cultura', value: 60}, {axis: 'Liderança', value: 90}, {axis: 'Pessoas', value: 20}, 
        {axis: 'Estrutura', value: 90}, {axis: 'Estratégia', value: 10}, {axis: 'Relacionamento', value: 50}]}
];

// normalizando/parse dados
spendData.forEach(function (d) {
d.Spent = d.Spent.match(/\d+/);
});


let svg_radar2 = RadarChart("#radarChart", data, radarChartOptions2);
let radarSetores = RadarChart("#radarChartSetores", spendData, radarChartOptions);

let setores_a_exibir = []


function remove_empty_bins(source_group) {
return {
  all: function () {
    return source_group.all().filter(function (d) {
      return d.value != 0;
    });
  },
};
}

var ndx = crossfilter(spendData),
  all = ndx.groupAll(),

yearDim = ndx.dimension(function (d) {
  return +d.Year;
}),
nameDim = ndx.dimension(function (d) {
  return d.name;
}),

femDim = ndx.dimension(function (d) {
  return d.name
}),
masDim = ndx.dimension(function (d) {
  return d.name
}),
culDim = ndx.dimension(function (d) {
          return d.name
      //return +d.Cul;
}),
relDim = ndx.dimension(function (d) {
  return d.name
}),
pesDim = ndx.dimension(function (d) {
  return d.name
}),
estDim = ndx.dimension(function (d) {
  return d.name
}),
infDim = ndx.dimension(function (d) {
  return d.name
}),
lidDim = ndx.dimension(function (d) {
  return d.name
}),
spendDim = ndx.dimension(function (d) {
  return Math.floor(d.Spent / 10);
}),

spendPerYear = yearDim.group().reduceSum(function (d) {
  return +d.Spent;
}),
spendPerName = nameDim.group().reduceSum(function (d) {
  return 1;
});
//  spendHist = spendDim.group().reduceCount(),
//  nonEmptyHist = remove_empty_bins(spendHist);

  
nameTypeGroup = nameDim.group();

qtdPerFem = femDim.group().reduceSum(function (d) {
  return +d.Fem;
}),
qtdPerMas = masDim.group().reduceSum(function (d) {
  return +d.Mas;
}),
qtdPerCul = culDim.group().reduceSum(function (d) {
  return +d.Cul;
}),
qtdPerRel = relDim.group().reduceSum(function (d) {
  return +d.rel;
}),
qtdPerInf = infDim.group().reduceSum(function (d) {
  return +d.inf;
}),
qtdPerEst = estDim.group().reduceSum(function (d) {
  return +d.est;
}),
qtdPerPes = pesDim.group().reduceSum(function (d) {
  return +d.pes;
}),
qtdPerLid = lidDim.group().reduceSum(function (d) {
  return +d.lid;
}),

//spendHistChart
//  .width(300)
//  .height(200)
//  .dimension(spendDim)
//  .group(nonEmptyHist)
//  .x(d3.scaleBand())
//  .xUnits(dc.units.ordinal)
//  .elasticX(true)
//  .elasticY(true);
//
//spendHistChart.xAxis().tickFormat(function (d) {
//  return d * 10;
//}); // convert back to base unit
//spendHistChart.yAxis().ticks(2);

yearRingChart
.width(200)
.height(200)
.dimension(yearDim)
.group(spendPerYear)
.innerRadius(50);

spenderRowChart
.width(350)
.height(200)
.dimension(nameDim)
.group(spendPerName)
.elasticX(true);

femRowChart
.width(350)
.height(200)
.dimension(femDim)
.group(qtdPerFem)
.elasticX(true);

masRowChart
.width(350)
.height(200)
.dimension(masDim)
.group(qtdPerMas)
.elasticX(true);

culRowChart
.width(350)
.height(200)
.dimension(culDim)
.group(qtdPerCul)
.label(d => d.key)
.elasticX(true)          

relRowChart
.width(350)
.height(200)
.dimension(relDim)
.group(qtdPerRel)
.elasticX(true);

estRowChart
.width(350)
.height(200)
.dimension(estDim)
.group(qtdPerEst)
.elasticX(true);

lidRowChart
.width(350)
.height(200)
.dimension(lidDim)
.group(qtdPerLid)
.elasticX(true);

infRowChart 
.width(350)
.height(200)
.dimension(infDim)
.group(qtdPerInf)
.elasticX(true);

pesRowChart
.width(350)
.height(200)
.dimension(pesDim)
.group(qtdPerPes)
.elasticX(true);

dc.renderAll();

let lista_original = []
function getListaOriginal(){
let encontrados = $(".dc-chart rect")
for(i=0; i<encontrados.length; i++){
  let setor = $(encontrados[i]).parent().find('text').text()
  if(!lista_original.includes(setor)){
    lista_original.push(setor)
  }
}
}
getListaOriginal()

function atualiza_radar(setores_selecionados_encontrados){
    let setores_selecionados = []
    if(!setores_selecionados_encontrados.length>0) lista_original.forEach(e=>$("#"+e).show())
    else{
    for(i=0; i<setores_selecionados_encontrados.length; i++){
        let setor = $(setores_selecionados_encontrados[i]).parent().find('text').text()
        if(!setores_selecionados.includes(setor)){
        setores_selecionados.push(setor)
        }
    }
    lista_original.forEach(e=>$("#"+e).hide())
    setores_selecionados.forEach(e=>$("#"+e).show())
    }

}

function atualiza_radar(setores_selecionados_encontrados){
    let setores_selecionados = []
    if(!setores_selecionados_encontrados.length>0) lista_original.forEach(e=>$("#"+e).show())
    else{
    for(i=0; i<setores_selecionados_encontrados.length; i++){
        let setor = $(setores_selecionados_encontrados[i]).parent().find('text').text()
        if(!setores_selecionados.includes(setor)){
        setores_selecionados.push(setor)
        }
    }
    lista_original.forEach(e=>$("#"+e).hide())
    setores_selecionados.forEach(e=>$("#"+e).show())
    }

}

function encontraPorPie(){
    let setores_selecionados_encontrados = $(".dc-chart rect[width!='0']")
    atualiza_radar(setores_selecionados_encontrados)
}

function encontraPorBar(){
    let setores_selecionados_encontrados = $(".dc-chart rect.selected[width!='0']")
    atualiza_radar(setores_selecionados_encontrados)
}

$(".dc-chart .pie-slice").click(function() {
    setTimeout(encontraPorPie, 800)
});

$(".dc-chart rect").click(function() {
    setTimeout(encontraPorBar, 800)
});
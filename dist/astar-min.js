// javascript-astar
// http://github.com/bgrins/javascript-astar
// MIT License
// Implements the astar search algorithm in javascript using a binary heap
var astar={init:function(a){for(var c=0,f=a.length;c<f;c++)for(var b=0,e=a[c].length;b<e;b++){var g=a[c][b];g.f=0;g.g=0;g.h=0;g.visited=!1;g.closed=!1;g.debug="";g.parent=null}},search:function(a,c,f,b){astar.init(a);var b=b||astar.manhattan,e=new BinaryHeap(function(a){return a.f});for(e.push(c);0<e.size();){c=e.pop();if(c===f){a=c;for(f=[];a.parent;)f.push(a),a=a.parent;return f.reverse()}c.closed=!0;for(var g=astar.neighbors(a,c),h=0,k=g.length;h<k;h++){var d=g[h];if(!d.closed&&!d.isWall()){var i=
c.g+1,j=d.visited;if(!j||i<d.g)d.visited=!0,d.parent=c,d.h=d.h||b(d.pos,f.pos),d.g=i,d.f=d.g+d.h,d.debug="F: "+d.f+"<br />G: "+d.g+"<br />H: "+d.h,j?e.rescoreElement(d):e.push(d)}}}return[]},manhattan:function(a,c){var f=Math.abs(c.x-a.x),b=Math.abs(c.y-a.y);return f+b},neighbors:function(a,c){var f=[],b=c.x,e=c.y;a[b-1]&&a[b-1][e]&&f.push(a[b-1][e]);a[b+1]&&a[b+1][e]&&f.push(a[b+1][e]);a[b]&&a[b][e-1]&&f.push(a[b][e-1]);a[b]&&a[b][e+1]&&f.push(a[b][e+1]);return f}};
Array.prototype.indexOf||(Array.prototype.indexOf=function(a,b){var d=this.length,c=Number(b)||0,c=0>c?Math.ceil(c):Math.floor(c);for(0>c&&(c+=d);c<d;++c)if(c in this&&this[c]===a)return c;return-1});Array.prototype.remove||(Array.prototype.remove=function(a,b){var d=this.slice((b||a)+1||this.length);this.length=0>a?this.length+a:a;return this.push.apply(this,d)});var GraphNodeType={OPEN:0,WALL:1};
function Graph(a){this.elements=a;for(var b=[],d,c,g=a.length,f=0;f<g;++f){d=a[f];c=d.length;b[f]=Array(c);for(var e=0;e<c;++e)b[f][e]=new GraphNode(f,e,d[e])}this.nodes=b}Graph.prototype.toString=function(){for(var a="\n",b=this.nodes,d,c,g,f,e=0,h=b.length;e<h;){d="";c=b[e++];for(g=0,f=c.length;g<f;)d+=c[g++].type+" ";a=a+d+"\n"}return a};function GraphNode(a,b,d){this.data={};this.x=a;this.y=b;this.pos={x:a,y:b};this.type=d}GraphNode.prototype.toString=function(){return"["+this.x+" "+this.y+"]"};
GraphNode.prototype.isWall=function(){return this.type==GraphNodeType.WALL};function BinaryHeap(a){this.content=[];this.scoreFunction=a}
BinaryHeap.prototype={push:function(a){this.content.push(a);this.sinkDown(this.content.length-1)},pop:function(){var a=this.content[0],b=this.content.pop();0<this.content.length&&(this.content[0]=b,this.bubbleUp(0));return a},remove:function(a){var b=this.content.indexOf(a),d=this.content.pop();b!==this.content.length-1&&(this.content[b]=d,this.scoreFunction(d)<this.scoreFunction(a)?this.sinkDown(b):this.bubbleUp(b))},size:function(){return this.content.length},rescoreElement:function(a){this.sinkDown(this.content.indexOf(a))},
sinkDown:function(a){for(var b=this.content[a];0<a;){var d=(a+1>>1)-1,c=this.content[d];if(this.scoreFunction(b)<this.scoreFunction(c))this.content[d]=b,this.content[a]=c,a=d;else break}},bubbleUp:function(a){for(var b=this.content.length,d=this.content[a],c=this.scoreFunction(d);;){var g=a+1<<1,f=g-1,e=null;if(f<b){var h=this.scoreFunction(this.content[f]);h<c&&(e=f)}if(g<b&&this.scoreFunction(this.content[g])<(null===e?c:h))e=g;if(null!==e)this.content[a]=this.content[e],this.content[e]=d,a=e;else break}}};

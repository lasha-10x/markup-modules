
function hglight(){
    document.querySelectorAll('.animation-target').forEach((block) => {
      hljs.highlightElement(block);
      // console.log("executed")
    });
}
function highlighttxt(){
  const txt = document.querySelector(".highlightText");
  hljs.highlightElement(txt);
}

export  {hglight ,highlighttxt};
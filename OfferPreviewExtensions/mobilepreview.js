window.onload = onWindowLoad;
function onWindowLoad() {
    document.getElementById("offerpreview").hidden = false;

    var creativeRequest = new XMLHttpRequest();
    creativeRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:

            var jsonOfferCreativeData = JSON.parse(creativeRequest.responseText);
            parseJsonToPageContent(jsonOfferCreativeData);

        }
    };
    var creativeUrl = "https://tesoro-offer-management-iad.iad.proxy.amazon.com/services/creative/localizedOffer?offerId=" + localStorage['offerId'] + '&locale=en_US';
    creativeRequest.open("POST", creativeUrl, true);
    creativeRequest.send();

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            var jsonOfferDetail = JSON.parse(xhttp.responseText);
            parsePriceInfo(jsonOfferDetail);

        }
    };
    var xmlUrl = "https://tesoro-offer-management-iad.iad.proxy.amazon.com/services/search/offer?offerId=" + localStorage['offerId'];
    xhttp.open("POST", xmlUrl, true);
    xhttp.send();

    document.getElementById("whywepickedit-seemore").onclick = function () { toggle("whywepickedit"); };
    document.getElementById("wewantyoutoknow-seemore").onclick = function () { toggle("wewantyoutoknow"); };

}

function parsePriceInfo(jsonOfferDetail) {


    // Typical action to be performed when the document is ready:
    // document.getElementById("message").innerHTML = xhttp.responseText;

    //var jsonOfferDetail = JSON.parse(xhttp.responseText);
    if (jsonOfferDetail['offerType'] == "BUYABLE") {
        document.getElementById('sample-badge-div').hidden = true;
        document.getElementById("price").innerText = "$" + jsonOfferDetail['offerPrice']['amount'];
        if (jsonOfferDetail['productType'] == "NON_PERISHABLE") {
            document.getElementById("discount").hidden = false;
        } else {
            document.getElementById("discount").hidden = true;
        }

    } else {
        document.getElementById("price").hidden = true;
        document.getElementById("discount").hidden = true;
        document.getElementById('sample-badge-div').hidden = false;
    }
}

function parseJsonToPageContent(jsonOfferCreativeData) {

    document.getElementById('heroimage').src = jsonOfferCreativeData['detailPageImagery']['heroImage']['src'];
  
    document.getElementById('altimage1').src = jsonOfferCreativeData['detailPageImagery']['additionalImages'][0]['src'];
    if (jsonOfferCreativeData['detailPageImagery']['additionalImages'].length > 1) {
      var ele = document.getElementById("altimge2Div");
      ele.hidden = false;
      var img = document.getElementById("altimage2")
      img.src = jsonOfferCreativeData['detailPageImagery']['additionalImages'][1]['src'];
    }
  
    document.getElementById('headline').innerText = jsonOfferCreativeData['detailPageCopy']['offerTitle'];
    document.getElementById('summary').innerText = jsonOfferCreativeData['detailPageCopy']['offerSubTitle'];
  
    var element = document.getElementById("whatyouget-text");
    console.log(element.innerText);
    while( element.firstChild) {
        element.removeChild(element.firstChild);
    }
    element.appendChild(StringToHTMLElement(jsonOfferCreativeData['detailPageCopy']['whatsIncluded']));
    console.log(element.innerText);
    
    element = document.getElementById("whywepickedit-text");
    element.innerHTML = '';
    element.appendChild(StringToHTMLElement(jsonOfferCreativeData['detailPageCopy']['whyWePickedIt']));
  
    element = document.getElementById("wewantyoutoknow-text");
    element.innerHTML = '';
    element.appendChild(StringToHTMLElement(jsonOfferCreativeData['detailPageCopy']['weWantYouToKnow']));
  
    document.getElementById('howtogetithome-title').innerText = jsonOfferCreativeData['detailPageCopy']['howToGetItHome']['accessibilityText'];
    document.getElementById('howtogetithome-image').src = jsonOfferCreativeData['detailPageCopy']['howToGetItHome']['src'];
    document.getElementById('sizeandweight-specifications').innerText = jsonOfferCreativeData['detailPageCopy']['sizeAndWeight']['summaryText'];
    document.getElementById('size-and-weight-specifications').innerText = jsonOfferCreativeData['detailPageCopy']['sizeAndWeight']['specificationText'];
  
  
  }


function StringToHTMLElement(str) {
    var strArr = str.split("***");
    var arrLength = strArr.length;
    var element = document.createElement("div");

    for (var i = 0; i < arrLength - 1; i++) {
        var para = document.createElement("p");
        var node = document.createTextNode(strArr[i]);
        para.appendChild(node);
        element.appendChild(para);
        var hr = document.createElement("hr");
        element.appendChild(hr);
    }
    var para = document.createElement("p");
    var node = document.createTextNode(strArr[arrLength - 1]);
    para.appendChild(node);
    element.appendChild(para);

    return element;
}





function toggle(prefix) {

    var x = document.getElementById(prefix + "-innerdiv").getAttribute("aria-expanded");
    if (x == "true") {
        x = "false";
        document.getElementById(prefix + "-innerdiv").setAttribute("aria-expanded", false);
        document.getElementById(prefix + '-middlediv').setAttribute("style", "max-height: none; height: 200px;");
        document.getElementById(prefix + '-seemore').getElementsByTagName("i")[0].setAttribute("class", "a-icon a-icon-extender-expand");
        document.getElementById(prefix + '-seemore').getElementsByTagName("span")[0].innerText = "See Mores";
        document.getElementById(prefix + '-fade').setAttribute("style", "");
    } else {
        x = "true";
        document.getElementById(prefix + "-innerdiv").setAttribute("aria-expanded", true);
        document.getElementById(prefix + '-middlediv').setAttribute("style", "max-height: none; height: auto;");
        document.getElementById(prefix + '-seemore').getElementsByTagName("i")[0].setAttribute("class", "a-icon a-icon-extender-collapse");
        document.getElementById(prefix + '-seemore').getElementsByTagName("span")[0].innerText = "See Less";
        document.getElementById(prefix + '-fade').setAttribute("style", "display: none;");

    }

    return false;
}




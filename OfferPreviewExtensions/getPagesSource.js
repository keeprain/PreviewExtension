function DOMtoString(document_root) {
    var html = '',
        node = document_root.firstChild;
        html += document_root.getElementById('creative-offer-title').value;

    var jsonData = {};
    jsonData["title"] = document_root.getElementById('creative-offer-title').value;
    jsonData["subtitle"] = document_root.getElementById('creative-offer-subtitle').value;
    jsonData["hero-image-url"] = document.getElementById('creative-hero-image-url').value;
    jsonData["alt1-image-url"] = document.getElementById('creative-alt1-image-url').value;
    jsonData["alt2-image-url"] = document.getElementById('creative-alt2-image-url').value;
    jsonData["whatsincludes"] = document.getElementById('creative-offer-includes').value;
    jsonData["creative-offer-reasons"] = document.getElementById('creative-offer-reasons').value;
    jsonData["creative-offer-wewantyoutoknow"] = document.getElementById('creative-offer-wewantyoutoknow').value;
    var e = document.getElementById("creative-offer-items-size");
    jsonData["item-size"] = e.options[e.selectedIndex].value;
    var rawUrl = document.getElementById('offer-page-breadcrumb-link').getAttribute('href');
    jsonData["rawUrl"] = rawUrl;
    var length = rawUrl.length;
    var idLength = "14da90cc-cd66-4798-9a83-d8a41e00c1a1".length;
    jsonData["offerId"] = rawUrl.substring(length-idLength, length);

   return jsonData;
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});
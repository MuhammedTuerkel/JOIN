document.addEventListener("DOMContentLoaded", function() {
    let textElements = document.getElementById('legalNotice');
    let text = textElements.innerHTML;

    let highlightedText = text.replace(/Join/g, '<span class="highlight">Join</span>');
    highlightedText = highlightedText.replace(/Developer/g, '<span class="highlight">Developer</span>');
    highlightedText = highlightedText.replace(/Akademie/g, '<span class="highlight">Akademie</span>');

    textElements.innerHTML = highlightedText;
})

function range(from, length) {
    const res = [];
    for (let i = 0; i < length; i++) {
        res.push(i + from);
    }
    return res;
}
function getItems(from, length, clickFn) {
    return range(from, length)
        .map(i => `<li class="page-item"><a class="page-link" href="#" onclick="${clickFn.name}(${i})">${i}</a></li>`)
        .join('')
}
class Paginator {
    constructor(pagesPerLine, idParent, clickFn) {
        this.pagesPerLine = pagesPerLine;
        this.clickFn = clickFn;
        this.parentElem = document.getElementById(idParent);
        this.show(1);
    }
    show(from) {
        this.parentElem.innerHTML = '';
        this.parentElem.innerHTML = `<nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#" onclick="${this.clickFn.name}('prev')" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          ${getItems(from, this.pagesPerLine, this.clickFn)}
          <li class="page-item">
      <a class="page-link" href="#" onclick="${this.clickFn.name}('next')" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
          `
    }
}
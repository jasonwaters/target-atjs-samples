(function () {

  const searchTemplate = `
    <h2>Search</h2>
    <form class="form-inline">
      <div class="form-group mx-sm-3 mb-2">
        <input class="form-control searchbox" type="text" placeholder="Search for {{searchProvider.domain}}&hellip;" name="search" value="{{result.term}}">
      </div>
      <button type="submit" class="btn btn-primary mb-2">Search</button>
    </form>
    {{#if result }}
      <p><small>{{result.message}}</small></p>
      <table class="table table-sm table-striped">
        <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Gender</th>
          <th scope="col">Birth Year</th>
        </tr>
        </thead>
        <tbody>
        {{#if result.list.length }}
          {{#each result.list}}
            <tr>
              <td>{{this.name}}</td>
              <td>{{this.gender}}</td>
              <td>{{this.birth_year}}</td>
            </tr>
          {{/each}}
        {{else}}
          <tr><td colspan="999">No results.</td></tr>
        {{/if}}
        </tbody>
    {{/if}}
    </table>`;

  const renderSearch = Handlebars.compile(searchTemplate);

  function updateSearch(searchProvider, searchTerm) {
    const searchEl = document.getElementById("search");

    const context = {
      searchProvider: searchProvider,
    };

    (typeof searchTerm === "string" && searchTerm.length > 0 ?
      searchProvider.execute(searchTerm).then(result => {
        context.result = result;
      })
      : Promise.resolve())
      .then(() => {
        searchEl.innerHTML = renderSearch(context);
        const form = searchEl.getElementsByTagName("form")[0];
        form.addEventListener("submit", evt => {
          evt.preventDefault();
          evt.stopImmediatePropagation();
          const searchTerm = evt.target.getElementsByTagName("input")[0].value;
          updateSearch(searchProvider, searchTerm);
        });
      })
  }

  window.updateSearch = updateSearch;
})();

$(document).ready(function () {

  function onClick() {
    var username = $('#username-input').val().trim();
    if (username === "") {
      alert("Please, enter a valid GitHub username.");
      return;
    }

    $("#repos-table-body").empty();

    $.get("https://api.github.com/users/" + username + "/repos")
      .done(function (getrepos) {
        if (getrepos.length === 0) {
          $("#repos-table-body").html(`
              <tr>
                  <td colspan="4" class="text-center text-muted">This user has no public repositories.</td>
              </tr>
          `);
          return;
        }

        getrepos.forEach(function (repo) {
          var row = `
              <tr>
                  <td class="fw-bold">${repo.name}</td>
                  <td>${repo.description || "No description"}</td>
                  <td>⭐ ${repo.stargazers_count}</td>
                  <td>
                      <a href="${repo.html_url}" target="_blank" class="btn btn-sm btn-outline-primary">
                          See Repo
                      </a>
                  </td>
              </tr>
          `;
          $("#repos-table-body").append(row);
        });
      })
      .fail(function () {
        $("#repos-table-body").html(`
            <tr>
                <td colspan="4" class="text-center text-danger">User not found or an error occurred.</td>
            </tr>
        `);
      });
  }

  $("#search-btn").click(onClick);

});

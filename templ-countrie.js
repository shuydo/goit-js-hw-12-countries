export default
    
`<h1>{{name}}</h1>
<div class="discription">
    <div class="text">
      <h2>Capital: {{capital}}</h2>
      <h2>Population: {{population}}</h2>
      <h2>Languages:</h2>
      <ul>
        {{#each langus}}
            <li><h3 class="list-group-item">{{this}}</h3></li>
        {{/each}}
      </ul>
    </div>
    
    <img src="{{flag}}" alt="flag"/>   
</div>`;

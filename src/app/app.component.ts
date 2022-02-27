import { Component, OnInit } from '@angular/core'
import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  data;
  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .query<any>({
        query: gql`
          {
            characters(offset: 2, limit: 8) {
              characters {
                name
                homeworld
                species
              }
            }
          }
        `,
      })
      .subscribe((data) => {
        this.data = data['data']['characters']['characters']
      })
  }
}
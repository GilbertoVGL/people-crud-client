<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">People Manager</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Sex</th>
              <th>City</th>
              <th>State</th>
              <th>Street</th>
              <th>District</th>
              <th>Number</th>
              <th>Email</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="people in peoples" :key="people.id">
              <td>{{ people.name }}</td>
              <td>{{ people.sex }}</td>
              <td>{{ people.city }}</td>
              <td>{{ people.state }}</td>
              <td>{{ people.street }}</td>
              <td>{{ people.district }}</td>
              <td>{{ people.addressnumber }}</td>
              <td>{{ people.email }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="populatePeopleToEdit(people)">Edit</a> -
                <a href="#" @click.prevent="deletePeople(people.id)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card :title="(model.id ? 'Edit Person: ' + model.name : 'New Person')">
          <form @submit.prevent="savePeople">
            <b-form-group label="Name">
              <b-form-input type="text" v-model="model.name"></b-form-input>
            </b-form-group>
            <b-form-group label="Sex">
              <b-form-input type="text" v-model="model.sex"></b-form-input>
            </b-form-group>
            <b-form-group label="City">
              <b-form-input type="text" v-model="model.city"></b-form-input>
            </b-form-group>
            <b-form-group label="State">
              <b-form-input type="text" v-model="model.state"></b-form-input>
            </b-form-group>
            <b-form-group label="Street">
              <b-form-input type="text" v-model="model.street"></b-form-input>
            </b-form-group>
            <b-form-group label="District">
              <b-form-input type="text" v-model="model.district"></b-form-input>
            </b-form-group>
            <b-form-group label="Number">
              <b-form-input type="text" v-model="model.addressnumber"></b-form-input>
            </b-form-group>
            <b-form-group label="Email">
              <b-form-input type="text" v-model="model.email"></b-form-input>
            </b-form-group>
            <div>
              <b-btn type="submit" variant="success">Save People</b-btn>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import api from '@/api'
export default {
  data () {
    return {
      loading: false,
      peoples: [],
      model: {}
    }
  },
  async created () {
    this.refreshPeoples()
  },
  methods: {
    async refreshPeoples () {
      this.loading = true
      this.peoples = await api.getPeoples()
      this.loading = false
    },
    async populatePeopleToEdit (people) {
      this.model = Object.assign({}, people)
    },
    async savePeople () {
      console.log(this.model.id ? "Model id: " + this.model.id : "No model id.");
      console.log("Full model: ", this.model);
      if (this.model.id) {
        console.log("We are in!")
        await api.updatePeople(this.model.id, this.model)
      } else {
        await api.createPeople(this.model)
      }
      this.model = {} // reset form
      await this.refreshPeoples()
    },
    async deletePeople (id) {
      if (confirm('Are you sure you want to delete this person?')) {
        // if we are editing a person we deleted, remove it from the form
        if (this.model.id === id) {
          this.model = {}
        }
        await api.deletePeople(id)
        await this.refreshPeoples()
      }
    }
  }
}
</script>
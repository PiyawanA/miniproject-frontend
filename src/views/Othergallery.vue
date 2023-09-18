  <template>
  <v-container>
    <v-card>
      <v-toolbar color="#e0a4a6">
        <div>
          <v-card-title>{{ user.galleryname }}</v-card-title>
        </div>
      </v-toolbar>
    </v-card>
    <v-card class="pa-4 mb-2">
      <div
        style="display: flex; flex-direction: row; justify-content: space-around; align-items: center;"
      >
        <v-avatar size="150">
          <img :src="'data:image/jpeg;base64,' + user.picprofile" />
        </v-avatar>

        <div>
          <v-card-title>{{ user.firstname }} {{ user.lastname }}</v-card-title>
          <v-card-subtitle>@{{ user.username }}</v-card-subtitle>
          <v-card-text>{{ items.description }}</v-card-text>
          <v-card-text>Joined: {{ formattedDateTime(user.time) }}</v-card-text>
        </div>
      </div>
    </v-card>

    <Add />
    <v-row justify="start">
      <v-col v-for="item in items" :key="item.picId" cols="12" md="3">
        <v-dialog v-model="dialog" max-width="600">
          <template v-slot:activator="{ on, attrs }">
            <v-card v-bind="attrs" v-on="on">
              <v-img
                :src="'data:image/jpeg;base64,' + item.pic"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
              >
                <v-card-title v-text="item.name"></v-card-title>
                <v-card-subtitle v-text="formattedDateTime(item.time)"></v-card-subtitle>
              </v-img>

              <v-card-actions>
                <v-list-item-avatar color="grey darken-3">
                  <v-img class="elevation-6" alt :src="'data:image/jpeg;base64,' + user.picprofile"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-text="user.galleryname"></v-list-item-title>
                </v-list-item-content>
                <v-spacer></v-spacer>
                <v-icon>mdi-comment-outline</v-icon>
                <div>comment</div>
              </v-card-actions>
            </v-card>
          </template>

          <template>
            <v-card>
              <v-toolbar color="#893744" dark>
                <v-list-item-avatar color="grey darken-3">
                  <v-img class="elevation-6" alt :src="'data:image/jpeg;base64,' + user.picprofile"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                </v-list-item-content>
                <v-spacer></v-spacer>
              </v-toolbar>

              <v-card-text>
                <v-card>
                  <v-img
                    style=" height: 100%;
                                width: 100%;
                                margin-top: 10px;
                                border-radius: 8px;"
                    :src="'data:image/jpeg;base64,' + item.pic"
                  />
                  <v-card-title v-text="item.name"></v-card-title>
                  <v-card-text v-text="item.caption"></v-card-text>
                  <v-card-subtitle v-text="'Posted: '+formattedDateTime(item.time)"></v-card-subtitle>
                </v-card>
                <comment :id="item.picId" />
              </v-card-text>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>
    
    <script>
import Add from "../components/Addphoto.vue";
import comment from "../components/Comment.vue";
import edit from "../components/Editprofile.vue";
import { request } from "../../axios-config";
import dayjs from "dayjs";
import Swal from "sweetalert2";

// import "dayjs/locale/th";
// dayjs.locale("th");

export default {
  components: {
    Add,
    comment,
    edit
  },

  data() {
    return {
      items: [],
      user: null, // Initialize user as null or an empty object
      itemId: null
    };
  },

  created() {
    this.itemId = this.$route.params.id;
    console.log("itemId:", this.itemId);
    this.fetchItems();
  },

  methods: {
    formattedDateTime(date) {
      // Use dayjs to format the current date and time
      return dayjs(date).format("DD MMMM YYYY ");
    },

    async fetchItems() {
      try {
        const response = await request.get(`/photo/${this.itemId}`);
        console.log("Response data:", response.data);
        this.items = response.data;

        if (this.items.length > 0) {
          this.user = this.items[0].gallery;
          console.log(this.user);
        } else {
          console.log("No items found");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }
};
</script>
    
    
    <style>
</style>
    
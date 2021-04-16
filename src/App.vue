 <template>
  <div id="app">

    <div class="container">
      <header class="blog-header pt-2 pb-2 border-bottom">
        <div class="row flex-nowrap justify-content-between align-items-center">
          <div class="col-4 pt-1">
            <a class="text-muted" href="#">Подписка</a>
          </div>
          <div class="col-4 text-center">
            <a href="/" class="mx-auto blog-header-logo text-dark font-weight-bold" id="headerLogo" >NewsSite</a>
          </div>
          <div class="col-4 d-flex justify-content-end align-items-center">
            <a class="text-muted" href="#" aria-label="Search">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="mx-3" role="img" viewBox="0 0 24 24" focusable="false"><title>Search</title><circle cx="10.5" cy="10.5" r="7.5"/><path d="M21 21l-5.2-5.2"/></svg>
            </a>
            <a href="/signup" class="btn btn-sm btn-outline-secondary mr-1">Регистрация</a>
            <button type="button" class="btn btn-sm btn-outline-secondary" data-toggle="modal" data-target="#exampleModal">
              Войти
            </button>
          </div>
        </div>
      </header>

      <div class="nav-scroller pb-1 mb-2">
        <nav class="nav d-flex justify-content-between">
          <router-link to="/articletype" class="p-2 text-muted">Категории</router-link>
          <router-link to="/article" class="p-2 text-muted">Статьи</router-link>
          <router-link to="/user" class="p-2 text-muted">Пользователи</router-link>
          <a class="p-2 text-muted" href="#">Дизайн</a>
          <a class="p-2 text-muted" href="#">Культура</a>
          <a class="p-2 text-muted" href="#">Наука</a>
          <a class="p-2 text-muted" href="#">Политика</a>
        </nav>
      </div>
    </div>


    <router-view/>

  </div>
</template>


<style lang="less">
/*#app {*/
/*  font-family: Avenir, Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  !*text-align: center;*!*/
/*  color: #2c3e50;*/
/*}*/

#headerLogo {
  font-family: "Playfair Display", serif;
  font-weight: bold;
  font-size: 2.20em;
  text-decoration: none;
}

#mainHeading {
  font-family: "Playfair Display", sans-serif;
  font-size: 5em;
}

#articleHeader {
  font-family: "Playfair Display", sans-serif, bold;
}

.ModalLabel1 {
  font-family: "Playfair Display", sans-serif;
  font-size: 2em;
}

.ModalLabel2 {
  font-family: "Playfair Display", sans-serif;
}

.form_labels {
  font-size: 1em;
}
</style>

<template>
  <div class="contact-form">
    <form action="#" @submit.prevent="submit">
      <div class="row">
        <input type="text" name="name" id="name" required="" v-model="name" placeholder="Name" />
        <input type="email" name="email" id="email" required="" @blur="email.isTouched = true" :class="{ email, error: isEmailError }" v-model="email.value" placeholder="Email" />
      </div>
      <div class="row textarea-wrap">
        <textarea class="message" name="textarea" id="textarea" required="" v-model="message.text" :maxlength="message.maxlength" placeholder="Message"></textarea>
        <span class="counter">{{ message.text.length }} / {{ message.maxlength }}</span>
      </div>
      <div class="btn-row">
        <input type="submit" value="Send" :disabled="!isEmailValid" />
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ContactForm',
  data() {
    return {
      name: '',
      email: {
        value: '',
        valid: true,
        isTouched: false,
      },
      message: {
        text: '',
        maxlength: 255,
      },
      submitted: false,
      emailRegExp: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    };
  },
  methods: {
    submit() {
      const data = {
        name: this.name,
        email: this.email.value,
        message: this.message.text,
      };

      axios({
        method: 'post',
        url: 'http://fileredact.com/contact-us',
        data,
      })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    validate: (type, value) => {
      if (type === 'email') {
        this.email.valid = !!this.isEmail(value);
      }
    },
    isEmail: value => this.emailRegExp.test(value),
  },
  computed: {
    isEmailValid() {
      return this.emailRegExp.test(this.email.value);
    },
    isEmailError() {
      return !this.isEmailValid && this.email.isTouched;
    },
  },
};
</script>

<style lang="scss" scoped>
*,
*::after,
*::before {
  box-sizing: border-box;
}

.contact-form {
  font-size: 16px;
  padding: 10px 0 5px;

  input[type='text'],
  input[type='email'],
  textarea {
    display: block;
    width: calc(100% - 10px);
    margin: 0 5px;
    appearance: none;
    color: #2b3e51;
    padding: 10px;
    border: 1px solid #cfd9db;
    background-color: #ffffff;
    border-radius: 0.25em;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.08);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Helvetica, Arial, sans-serif;
    &:focus {
      outline: none;
      border-color: #2c3e50;
      box-shadow: 0 0 5px rgba(44, 151, 222, 0.2);
    }
  }
  textarea {
    min-height: 100px;
    resize: vertical;
    overflow: auto;
  }
  input[type='submit'] {
    border: none;
    background: #2c3e50;
    border-radius: 0.25em;
    padding: 10px 20px;
    color: #ffffff;
    font-weight: bold;
    cursor: pointer;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    appearance: none;

    &:hover {
      background: #42a2e1;
    }
    &:focus {
      outline: none;
      background: #2b3e51;
    }
    &:disabled {
      background: #5d7e78 !important;
      cursor: default !important;
    }
    &:active {
      transform: scale(0.9);
    }
  }
  .row {
    padding: 0 0 10px;
    margin: 0 -5px;
    display: flex;
    position: relative;

    input {
      margin: 0 5px;
    }
  }
  .btn-row {
    display: flex;

    input[type='submit'] {
      margin: 0 0 0 auto;
    }
  }
  .error-message {
    height: 35px;
    margin: 0px;

    p {
      background: #e94b35;
      color: #ffffff;
      font-size: 1.4rem;
      text-align: center;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      border-radius: 0.25em;
      padding: 16px;
    }
  }
  .error {
    border-color: #e94b35 !important;
  }
  .counter {
    background-color: #ecf0f1;
    position: absolute;
    right: 6px;
    top: 1px;
    font-size: 10px;
    padding: 1px 3px;
    color: #666;
    border-radius: 0.25em;
  }
  .textarea-wrap {
    position: relative;
  }
}
</style>

# cuaderno

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/59d9851fdf92484bbee3853965e277b1)](https://www.codacy.com/gh/nejdetkadir/cuaderno/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=nejdetkadir/cuaderno&amp;utm_campaign=Badge_Grade)

# Screenshots
Main layout                |  Details layout           |    Auth layout
:-------------------------:|:-------------------------:|:-------------------------:
![main](doc/main.png)      |![details](doc/details.png)| ![auth](doc/auth.png)

## Project setup
```
npm install
```

### Environment variables
Create a file named ".env.local" in the root directory and fill its contents as follows.
```ruby
VUE_APP_FIREBASE_API_KEY = XXX
```

### Start development server
If you use NPM:
```
npm run electron:serve
```
If you use Yarn:
```
yarn electron:serve
```

### Build application
With NPM:
```
npm run electron:build
```
or with Yarn:
```
yarn electron:build
```

# LICENSE
```
MIT License

Copyright (c) 2020 Nejdet Kadir Bektaş

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
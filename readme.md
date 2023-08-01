#### Building for source

For production release:

```sh
cd web
npm run build-prod
cd ..
python -m eel main.py web\dist --noconsole -i='.\favicon.ico' --name "PyPasswords"
```

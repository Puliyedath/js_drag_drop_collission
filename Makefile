js_files = src/d**/*.js
js_entry = src/entry.js
bundle_js = public/bundle.js
src = ./src

build: buildjs

buildjs : $(js_files)
	browserify -e $(js_entry) -o $(bundle_js)

startServer:
	superstatic public --port 8080 --host 127.0.0.1

setup :
	make clean
	rm -rf public src
	mkdir -p public src/{draggable,droppable}
	touch src/entry.js
	touch public/bundle.js
	npm init -y
	npm install --save-dev browserify
	touch .gitignore
	echo "./node_modules" >> .gitignore
	echo "./*.~" >> .gitignore
	touch .projectile
	echo "-/node_modules" >> .projectile
	echo "-/public" >>.projectile

watch:
	while true; do make $(WATCHMAKE) ; inotifywait -qre close_write $(src); done

clean:
	rm -rf public node_modules

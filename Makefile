# Deploy compiled frontend to web server and puppet repo
#

all : deploy
.PHONY : all deploy production

deploy : production
	rsync -r -v -e 'ssh -p 2222' --delete dist/ beta.wattsworth.net:/opt/angular/lumen && \
	ssh -A -p2222 beta.wattsworth.net /home/jdonnal/rebuild_angular.sh

production:
	ng build --env prod --prod



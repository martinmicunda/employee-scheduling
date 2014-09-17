
Employee Scheduling
===================
[![Build Status](https://secure.travis-ci.org/martinmicunda/employee-scheduling.png)](http://travis-ci.org/martinmicunda/employee-scheduling) [![Dependency Status](https://david-dm.org/martinmicunda/employee-scheduling.png)](https://david-dm.org/martinmicunda/employee-scheduling) [![devDependency Status](https://david-dm.org/martinmicunda/employee-scheduling/dev-status.png)](https://david-dm.org/martinmicunda/employee-scheduling#info=devDependencies) [![Coverage Status](https://coveralls.io/repos/martinmicunda/employee-scheduling/badge.png?branch=master)](https://coveralls.io/r/martinmicunda/employee-scheduling?branch=master)

An employee scheduling application that makes employee scheduling and management easy, fast and mobile.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Architecture Diagram](#architecture-diagram)
    - [Development](#diagram-development)
    - [Production](#diagram-production)
- [Directory Layout](#directory-layout)
- [Installation & Configuration](#installation-and-configuration)
    - [Platform & Tools](#platform-and-tools)
    - [Installation](#app)
- [Running App](#running-app)
    - [Development](#development) 
    - [Debugging](#debugging) 
- [Vagrant](#vagrant)
- [Ansible](#ansible)
- [Versioning](#versioning)
- [FAQ](#faq)
- [License](#license)

## Technologies Used
| Client Side | Server Side | DevOps | Test | 
|:-------------------:|:-------------------:|:-------------------:|:-------------------:| 
| [Angular.js](http://angularjs.org/) ![Angularjs](https://avatars1.githubusercontent.com/u/139426?s=30) | [Node.js](http://nodejs.org/) <img src="http://nodejs.org/images/logo-light.svg" height="30" width="80" /> | [Gulp](http://gulpjs.com/) ![Gulp](https://avatars0.githubusercontent.com/u/6200624?s=30) &nbsp; [Bower](http://bower.io/) ![Bower] (https://avatars3.githubusercontent.com/u/3709251?s=30) | [Jasmine](http://pivotal.github.io/jasmine/) <img src="https://rawgithub.com/pivotal/jasmine/master/images/jasmine-horizontal.svg" height="40" width="50" /> |
[HTML5](http://www.w3.org/TR/2011/WD-html5-20110525/) <img src="http://www.w3.org/html/logo/downloads/HTML5_Logo_256.png" height="30" width="30" /> | [Hapi.js](http://hapijs.com/) ![Hapi] (https://avatars3.githubusercontent.com/u/3774533?v=2&s=30) | [NPM](https://www.npmjs.org/) ![NPM] (https://avatars0.githubusercontent.com/u/6078720?s=30) &nbsp;                 [Ansible](https://www.ansible.com/) ![Ansible] (https://avatars3.githubusercontent.com/u/1507452?v=2&s=30) | [Karma](http://karma-runner.github.io/) ![Karma] (https://avatars3.githubusercontent.com/u/3284117?s=30) | 
[CSS3](http://www.w3.org/TR/2001/WD-css3-roadmap-20010523/) <img src="http://marketplace.servicerocket.com/static/images/logos/css3logo.png" height="30" width="30" /> | [Couchbase](http://hapijs.com/) ![Couchbase] (https://avatars3.githubusercontent.com/u/605755?v=2&s=30) | [Nginx](http://nginx.org/) ![Nginx](https://avatars3.githubusercontent.com/u/1412239?s=25) &nbsp; [Docker](https://www.docker.io/) ![Docker] (https://avatars2.githubusercontent.com/u/5429470?v=2&s=30) | [Protractor](http://github.com/angular/protractor/) |
| [Bootstrap 3](http://getbootstrap.com/) ![Bootstrap](https://avatars2.githubusercontent.com/u/2918581?s=25) | | [Vagrant](http://www.vagrantup.com/) <img src="https://www.hashicorp.com/images/blog/a-new-look-for-vagrant/logo-8b7a4912.png" height="30" width="35" /> &nbsp; [AWS](http://aws.amazon.com/) <img src="https://a0.awsstatic.com/main/images/logos/aws_logo.png" height="30" width="80"> |

## Architecture Diagram
###<a name="diagram-development"> Development
###<a name="diagram-production"> Production

##<a name="directory-layout"></a> Directory Layout

    ansible/ 
      |- group_vars/           --> ansible group variables
	  |  |- all                  --> variables for all groups
      |  |- development          --> variables for development group
      |- inventories/          --> ansible inventories files (hosts) for different environments
      |  |- development          --> inventory file (hosts) for development servers
      |  |- production           --> inventory file (hosts) for production servers
      |  |- staging              --> inventory file (hosts) for staging servers            
      |- apiservers.yml        --> ansible playbook for apiserver tier
      |- dbservers.yml         --> ansible playbook for dbserver tier
      |- vagrant.yml           --> ansible master playbook for Vagrant environment
      |- webservers.yml        --> ansible playbook for webserver tier
      
##<a name="installation-and-configuration"></a> Installation & Configuration
###<a name="platform-and-tools"></a> Platform & Tools
You need to have installed follow tools on your machine:

- [Virtualbox](https://www.virtualbox.org/wiki/Downloads) 4.3.16+
- [Vagrant](http://www.vagrantup.com/downloads.html) 1.6.2+
- [Ansible](http://docs.ansible.com/intro_installation.html) 1.7.0+

###<a name="installation"></a> Installation

**1.** Clone this repository:
```bash
$ git clone git@github.com:martinmicunda/employee-scheduling.git
$ cd employee-scheduling
```

**2.** The following command would add a new `ubuntu trusty64 box`, and if an existing one is found, it will override it:

```bash
$ vagrant box add trusty64 http://files.vagrantup.com/trusty64.box --force
```
>**NOTE:** This process may take a while, as most Vagrant boxes will be at least **200 MB** big.

Verify that box was installed by running the `list` subcommand that will list the boxes installed within Vagrant along with the provider that backs the box:

```bash
$ vagrant box list
ubuntu/trusty64  (virtualbox, 14.04)
```
**3.** The following command would install a `vagrant plugins` for this project, and if an existing one is found, it will override it:

```bash
$ bash bin/vagrant-install-plugins.sh
```
Verify that vagrant plugins were installed by running the `list` subcommand that will list the installed roles:

```bash
$ vagrant plugin list
vagrant-hostmanager (1.5.0)
```
 
**4.** The following command would install an `ansible roles` for this project, and if an existing one is found, it will override it:

```bash
$ bash bin/ansible-install-roles.sh
```
Verify that ansible roles were installed by running the `list` subcommand that will list the installed roles:

```bash
$ ansible-galaxy list
martinmicunda.bower, v1.0.0
martinmicunda.common, v1.0.0
martinmicunda.gulp, v1.0.0
martinmicunda.nodejs, v1.0.1
```
**5.** Now, run `vagrant up` that will create `3 virtual machines` and provisioning each of these machines. 

```bash
$ vagrant up
```
>**NOTE:** **Vagrant will provision the virtual machine only once on the first run, any subsequent provisioning must be executed with the** `--provision` **flag either** `vagrant up --provision` **or** `vagrant reload --provision` **. The provisioning will re-run also if you destroy the VM and rebuild it with** `vagrant destroy` **and** `vagrant up` **.**

If there have been no errors when executing the above commands, the machines  `web`, `api` and `db` should be created. The following command would outputs status of the vagrant machine:

```bash
$ vagrant status
Current machine states:
web                       running (virtualbox)
api                       running (virtualbox)
db                        running (virtualbox)
```
Now you should be able to ssh into any of those boxes:
```bash
$ vagrant ssh web  # ssh to web server
$ vagratn ssh api  # ssh to api server
$ vagrant ssh db   # ssh to db server
```
To make it easier to type, following aliases have been added to your `/etc/hosts` file:
```
192.168.33.10   web www.dev.employee-scheduling dev.employee-scheduling
192.168.33.11   app www.dev.employee-scheduling dev.employee-scheduling
192.168.33.12   db www.dev.employee-scheduling dev.employee-scheduling
```
Finally, open up your browser and navigate to [http://dev.employee-scheduling](http://dev.employee-scheduling) or [http://192.168.33.10](http://192.168.33.10) to connect to your local environment.

## Running App
### Development
To start the server you need to ssh into `api` box:
```bash
$ vagrant ssh api
$ cd server
$ node server.js
```
Open up your browser and navigate to [http://dev.employee-scheduling](http://dev.employee-scheduling) or [http://192.168.33.10](http://192.168.33.10) to connect to your local environment.

### Debugging
To start the server in debugging mode you need to ssh into `api` box:
```bash
$ vagrant ssh api -- -L 5858:127.0.0.1:5858 #setup ssh proxy to VM
$ cd server
$ node --debug server.js # start server in debug mode
```
Run the following from your HOST machine, not your vagrant box:
```bash
$ telnet 127.0.0.1 5858
```
You should get a response like: 
```bash
Type: connect
V8-Version: 3.14.5.9
Protocol-Version: 1
Embedding-Host: node v0.10.28
Content-Length: 0
```
Now you can debugging `api` node.js session remotely using [WebStorm](http://www.jetbrains.com/webstorm/) or [Node Inspector](https://github.com/node-inspector/node-inspector).

## Vagrant 
There’s a ton of commands you can use to talk to Vagrant. For a full list see the [official docs](http://docs.vagrantup.com/v2/cli/), but here are the more common ones.

* `vagrant up` - use this command to `start` your virtual environment
* `vagrant halt` - use this command to `stop` your virtual environment
* `vagrant suspend` - use this command to `pause` your virtual environment, make sure you do this before shutting down your computer to safely be able to restore the environment later.
* `vagrant destroy` - use this command to `removes` your virtual environment from your machine
* `vagrant reload` - use this command to your virtual environment, if you add the `--provision` flag, it will reprovision the box as well; this is useful with removing or adding things to the server via Ansible.
* `vagrant ssh` - use this command to `connect` to the virtual server

## Ansible
To get better understanding how Ansible works check the [official docs](http://docs.ansible.com/). Ansible installs the following software:

* **web box:**
	* git
	* node.js
	* npm
	* nginx
	* gulp
	* bower
* **api box:**
	* git
	* node.js
	* npm
	* gulp
* **db box:**
	* git 
	* couchbase

The `couchbase` and `nginx` services are started after provisioning takes place.

## Versioning

Releases will be numbered with the following format:

`<major>.<minor>.<patch>`

And constructed with the following guidelines:

* Breaking backward compatibility bumps the major (and resets the minor and patch)
* New additions without breaking backward compatibility bumps the minor (and resets the patch)
* Bug fixes and misc changes bumps the patch

For more information on SemVer, please visit <http://semver.org/>.

## FAQ
### What if I want to uninstall application?
**1.** The following command would permanently removes the `web`, `api` and `db` virtual boxes from your machine:
```bash
$ vagrant destroy
```
**2.** The following command would uninstall an `ansible roles` for this project:
```bash
$ bash bin/ansible-uninstall-roles.sh
```
**3.** The following command would uninstall a `vagrant plugins` for this project:
```bash
$ bash bin/vagrant-uninstall-plugins.sh
```
**4.** The following command would remove  `trusty64 box`:
```bash
$ vagrant box remove trusty64
```
###What if I want a fresh install?
If you wish to destroy the `web`, `api` and `db` virtual boxes to make sure you have a fresh start, you can do these steps:
```bash
 $ vagrant destroy 
 $ vagrant up
```

###What if I want different IP addresses for my hosts with Vagrant?
In the [`Vagrantfile`](Vagrantfile) you find this section:

    servers = {
                "web" => "192.168.33.10",
                "app" => "192.168.33.11",
                "db"  => "192.168.33.12",
              }

This is where the IP addresses of the machines are defined. You can change those to some other private addresses that you may prefer.

Please note that you will also have to edit the [`inventories/development`](inventories/development) file,
specfically this section:

	[all-hosts]
	web ansible_ssh_host=192.168.33.10
	api ansible_ssh_host=192.168.33.11
	db  ansible_ssh_host=192.168.33.12

Adjust the IP addresses to whatever values you have chosen in [`Vagrantfile`](Vagrantfile).

## License

    Copyright (c) 2014 Martin Micunda  

    Source code is open source and released under the GNU GPL v3 license.

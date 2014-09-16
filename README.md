[![Build Status](https://secure.travis-ci.org/martinmicunda/employee-scheduling.png)](http://travis-ci.org/martinmicunda/employee-scheduling) [![Dependency Status](https://david-dm.org/martinmicunda/employee-scheduling.png)](https://david-dm.org/martinmicunda/employee-scheduling) [![devDependency Status](https://david-dm.org/martinmicunda/employee-scheduling/dev-status.png)](https://david-dm.org/martinmicunda/employee-scheduling#info=devDependencies) [![Coverage Status](https://coveralls.io/repos/martinmicunda/employee-scheduling/badge.png?branch=master)](https://coveralls.io/r/martinmicunda/employee-scheduling?branch=master)

Employee Scheduling
===================

An employee scheduling application that makes employee scheduling and management easy, fast and mobile.

## Table of Contents

## Technologies Used

## Architecture Diagram
### Development
### Production

##<a name="directory-layout"></a> Directory Layout

    ansible/ 
      |- group_vars/           --> group variables
	  |  |- all                  --> variables for all groups
      |  |- development          --> variables for development group
      |- inventories/          --> inventories files (hosts) for different environments
      |  |- development          --> inventory file (hosts) for development servers
      |  |- production           --> inventory file (hosts) for production servers
      |  |- staging              --> inventory file (hosts) for staging servers            
      |- apiservers.yml        --> playbook for apiserver tier
      |- dbservers.yml         --> playbook for dbserver tier
      |- vagrant.yml           --> master playbook for Vagrant environment
      |- webservers.yml        --> playbook for webserver tier
      
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

**2.** The following command would add a new `trusty64` box, and if an existing one is found, it will override it:

```bash
$ vagrant box add trusty64 http://files.vagrantup.com/trusty64.box --force
```
>**NOTE:** This process may take a while, as most Vagrant boxes will be at least **200 MB** big.

Verify that box was installed by running the `list` subcommand that will list the boxes installed within Vagrant along with the provider that backs the box:

```bash
$ vagrant box list
ubuntu/trusty64  (virtualbox, 14.04)
```
**3.** The following command would install a vagrant plugins for this project, and if an existing one is found, it will override it:

```bash
$ bash bin/vagrant-install-plugins.sh
```
Verify that vagrant plugins were installed by running the `list` subcommand that will list the installed roles:

```bash
$ vagrant plugin list
vagrant-hostmanager (1.5.0)
```
 
**4.** The following command would install an ansible roles for this project, and if an existing one is found, it will override it:

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
**5.** Now, run `vagrant up` that will create 3 virtual machines and provisioning each of these machines. 

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
```
vagrant ssh web  # ssh to web server
vagratn ssh api  # ssh to api server
vagrant ssh db   # ssh to db server
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
### Debugging

## Vagrant 
Some Basic Commands:

* `vagrant up` - use this command to `start` your virtual environment
* `vagrant suspend` - use this command to `suspend` your virtual environment

## Ansible
Ansible installs the following software:


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
**2.** The following command would uninstall an ansible roles for this project:
```bash
$ bash bin/ansible-uninstall-roles.sh
```
**3.** The following command would uninstall a vagrant plugins for this project:
```bash
$ bash bin/vagrant-uninstall-plugins.sh
```
**4.** The following command would remove  `trusty64` box:
```bash
$ vagrant box remove trusty64
```

## License

    Copyright (c) 2014 Martin Micunda  

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

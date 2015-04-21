#####################################################################################
# Vagrant Development Environment for Employee Scheduling application.              #
#                                                                                   #
# Author: Martin Micunda                                                            #
#-----------------------------------------------------------------------------------#
# Prerequisites: Virtualbox, Vagrant, Ansible                                       #
# Usage: command 'vagrant up' in the folder of the Vagrantfile                      #
#####################################################################################

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

PROJECT_NAME = "employee-scheduling"


# This Vagrant environment requires Vagrant 1.6.0 or higher.
Vagrant.require_version ">= 1.6.0"

unless Vagrant.has_plugin?("vagrant-hostmanager")
    raise 'Vagrant-hostmanager is not installed! Please run `vagrant plugin install vagrant-hostmanager` before continuing`.'
end

# https://github.com/voytek-solutions/vm/blob/master/machines%2Fweb%2FVagrantfile
# https://github.com/bascht/consul-playground/blob/master/app%2FVagrantfile
# http://thornelabs.net/2014/11/13/multi-machine-vagrantfile-with-shorter-cleaner-syntax-using-json-and-loops.html
#####################################################################################
#                             VAGRANT MAGIC BEGINS HERE                             #
#-----------------------------------------------------------------------------------#
#          For full documentation on vagrant please visit www.vagrantup.com!        #
#####################################################################################

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
    # Specify the base box
    config.vm.box = "ubuntu/trusty64"

    # Configure hostmanager
    config.hostmanager.enabled = true
    config.hostmanager.manage_host = true
    config.hostmanager.ignore_private_ip = false
    config.hostmanager.include_offline = true

     servers = {
                "ui"         => "192.168.33.10",
                "api"        => "192.168.33.11",
                "db"         => "192.168.33.12",
                "nsqlookupd" => "192.168.33.13",
                "nsqadmin"   => "192.168.33.14",
                "services"   => "192.168.33.15",
                "consul"     => "192.168.33.16"
              }

    if ENV['env'] == 'test'
      config.vm.define "dev" do |server_conf|
        server_conf.vm.hostname = "dev"
        server_conf.vm.network "private_network", ip: "192.168.33.10"
        server_conf.vm.synced_folder "./api", "/home/vagrant/api"
        server_conf.hostmanager.aliases = ["www.dev." + PROJECT_NAME  + ".com", "dev." + PROJECT_NAME + ".com"]
      end
    end


        #if ENV['env'] == 'development'
        servers.each do |server_name, server_ip|
            config.vm.define server_name do |server_conf|
                server_conf.vm.hostname = server_name
                server_conf.vm.network "private_network", ip: server_ip

                # only synchronize `ui`, `services` and `api` folders
                if server_name == 'ui' || server_name == 'api' || server_name == 'services'
                    server_conf.vm.synced_folder "./" + server_name, "/home/vagrant/" + server_name
                end

                case server_name
                    when 'ui'
                        server_conf.hostmanager.aliases = ["www.dev." + PROJECT_NAME  + ".com", "dev." + PROJECT_NAME + ".com"]
                    when 'nsqadmin'
                        server_conf.hostmanager.aliases = ["www.nsq." + PROJECT_NAME  + ".com", "nsq." + PROJECT_NAME + ".com"]
                    when 'consul'
                        server_conf.hostmanager.aliases = ["www.consul." + PROJECT_NAME  + ".com", "consul." + PROJECT_NAME + ".com"]
                end
            end
        end
        #end

    # Provision the VirtualBoxes with Ansible
    config.vm.provision "ansible" do |ansible|
        ansible.playbook = "ansible/vagrant.yml"
        ansible.groups = {
          "dev" => ["dev"],
          "testing:children" => ["dev"]
        }
        # ansible.inventory_path = "ansible/inventories/testing" #development
        ansible.raw_arguments = ['-v']
    end

    # Configure VM settings for servers running in VirtualBox
    config.vm.provider "virtualbox" do |vb|
        vb.memory = 1024
        vb.cpus = 2
    end
end

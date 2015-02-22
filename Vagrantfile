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

  #config.vm.define "ui" do |v|
  #  v.vm.provider "docker" do |d|
  #    d.image = "phusion/baseimage"
  #    d.volumes = ["/var/docker/redis:/data"]
  #    d.ports = ["6379:6379"]
  #    d.vagrant_vagrantfile = "./Vagrantfile.proxy"
  #  end
  #end
    servers = {
                "ui"  => "192.168.33.10",
                "api" => "192.168.33.11",
                "db"  => "192.168.33.12",
              }

    servers.each do |server_name, server_ip|
        config.vm.define server_name do |server_conf|
            server_conf.vm.hostname = server_name
            server_conf.vm.network "private_network", ip: server_ip
            server_conf.vm.synced_folder "./" + server_name, "/home/vagrant/" + server_name
            server_conf.hostmanager.aliases = ["www.dev." + PROJECT_NAME  + ".com", "dev." + PROJECT_NAME + ".com"]
        end
    end

    # Provision the VirtualBoxes with Ansible
    config.vm.provision "ansible" do |ansible|
        ansible.playbook = "ansible/vagrant.yml"
        ansible.inventory_path = "ansible/inventories/development"
        ansible.raw_arguments = ['-v']
    end

    # Configure VM settings for servers running in VirtualBox
    config.vm.provider "virtualbox" do |vb|
        vb.memory = 1024
        vb.cpus = 2
    end
end

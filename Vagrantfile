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

# This Vagrant environment requires Vagrant 1.7.0 or higher.
Vagrant.require_version ">= 1.7.0"

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
    # Configure hostmanager
    config.hostmanager.enabled = true
    config.hostmanager.manage_host = true
    config.hostmanager.ignore_private_ip = false
    config.hostmanager.include_offline = true
    config.hostmanager.aliases = ["www.dev.employee-scheduling.local", "dev.employee-scheduling.local"]

    # Set up SSH agent forwarding
    config.ssh.forward_agent = true

    # Specify the base box
    config.vm.box = "ubuntu/trusty64"

    config.vm.hostname = "employee-scheduling"
    config.vm.network "private_network", ip: "192.168.33.10"
    config.vm.synced_folder "./api", "/home/vagrant/api"
    #config.vm.synced_folder "./ui", "/home/vagrant/ui"
    #config.vm.synced_folder "./", "/home/vagrant/"

    # Provision the VirtualBoxes with Ansible
    config.vm.provision "ansible" do |ansible|
        # ansible-playbook -i .vagrant/provisioners/ansible/inventory/vagrant_ansible_inventory --private-key=.vagrant/machines/default/virtualbox/private_key -u vagrant ansible/development.yml
        ansible.playbook = "ansible/development.yml"
        ansible.raw_arguments = ['-v']
    end

    # Configure VM settings for servers running in VirtualBox
    config.vm.provider "virtualbox" do |vb|
        # this is the name in the VirtualBox Manager UI
        vb.name = "employee-scheduling-dev"
        # set the system memory for the virtual machine
        vb.memory = 1024
        # number of Physical CPUs to allocate
        vb.cpus = 2
    end
end

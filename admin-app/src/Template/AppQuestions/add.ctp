<div class="actions columns large-2 medium-3">
    <h3><?= __('Actions') ?></h3>
    <ul class="side-nav">
        <li><?= $this->Html->link(__('List App Questions'), ['action' => 'index']) ?></li>
    </ul>
</div>
<div class="appQuestions form large-10 medium-9 columns">
    <?= $this->Form->create($appQuestion) ?>
    <fieldset>
        <legend><?= __('Add App Question') ?></legend>
        <?php
            echo $this->Form->input('app_school_id');
            echo $this->Form->input('question');
            echo $this->Form->input('answer');
        ?>
    </fieldset>
    <?= $this->Form->button(__('Submit')) ?>
    <?= $this->Form->end() ?>
</div>
